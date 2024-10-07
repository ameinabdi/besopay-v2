import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import  _  from 'lodash';

const Op = Sequelize.Op;

class InvoiceRepository {

  static async create(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );
    const totalAmount:any = _.sumBy(data?.Items, function(item:any) { return (parseFloat(item?.quantity) *parseFloat(item.unitPrice)); }); 


    const record = await options.database.invoice.create(
      {
        ...lodash.pick(data, [
          'dueDate',
          'invoiceNote',
          'shippingFee',
          'discount',
          'tax',
          'otherEmails',          
          'importHash',
        ]),
        totalAmount,
        grantTotal:data.grantTotal,
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );
    data.Items.map(async(item) => {
      const amount = (parseFloat(item.quantity)*parseFloat(item.unitPrice))
      await options.database.invoiceItems.create(
        {
          ...lodash.pick(item, [
            'item',
            'quantity',
            'unitPrice',
            'importHash',
          ]),
          totalAmount:amount,
          dueDate:data.orderDate,
          invoiceId: record.id || null,
          tenantId: tenant.id,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        {
          transaction,
        },
      );
    })

    await record.setCustomer(data.customer || [], {
      transaction,
    });    
    await record.setCurrency(data.currency || null, {
      transaction,
    });    

  
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );


    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const include = [
      {
        model: options.database.invoiceItems,
        as: 'Items',
      },
    ];

    let record = await options.database.invoice.findOne(      
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }
    const totalAmount:any = _.sumBy(data?.Items, function(item:any) { return (parseFloat(item?.quantity) *parseFloat(item.unitPrice)); }); 

    record = await record.update(
      {
        ...lodash.pick(data, [
          'dueDate',
          'invoiceNote',
          'shippingFee',
          'discount',
          'tax',
          'otherEmails',          
          'importHash',
        ]),
        totalAmount,
        grantTotal:data.grantTotal,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    await record.setCustomer(data.customer || [], {
      transaction,
    });
    await record.setCurrency(data.currency || null, {
      transaction,
    });
    const ids = data.Items.map((data)=>{return data.id ? data.id : ''})

    let deletes = await options.database.invoiceItems.findAll(      
      {
        where: {
          id: {
            [Op.notIn]: ids,
          },
          invoiceId: id,
        },
        transaction,
      },
    )


     for (const deleted of deletes) {
      let deletedOne = await options.database.invoiceItems.findOne(
        {
          where: {
            id:deleted.id,
          },
          transaction,
        },
      );
  
      if (!deletedOne) {
        throw new Error404();
      }
  
      await deletedOne.destroy({
        transaction,
      });
    }
    data.Items.map(async(item)=>{
      const idItem = item.id
      const totalAmount = parseFloat(item.quantity)*parseFloat(item.unitPrice)
      

      if(idItem && idItem != undefined){
        let findOneItem = await options.database.invoiceItems.findOne(      
          {
            where: {
              id:idItem,
            },
            transaction,
          },
        );
        await findOneItem.update(
          {
            ...lodash.pick(item, [
              'item',
              'quantity',
              'unitPrice',
              'importHash',
            ]),
            totalAmount,
            updatedById: currentUser.id,
          },
          {
            transaction,
          },
        );
        
      }else{
        await options.database.invoiceItems.create(
          {
            ...lodash.pick(item, [
              'item',
              'quantity',
              'unitPrice',
              'importHash',
            ]),
            totalAmount,
            invoiceId: record.id || null,
            tenantId: record.tenantId,
            createdById: currentUser.id,
            updatedById: currentUser.id,
          },
          {
            transaction,
          },
        );
        }
    })


    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.invoice.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }
    let deletes = await options.database.invoiceItems.findAll(      
      {
        where: {
          invoiceId: id,
        },
        transaction,
      },
    )
    for (const deleted of deletes) {
      let deletedOne = await options.database.invoiceItems.findOne(
        {
          where: {
            id:deleted.id,
          },
          transaction,
        },
      );
  
      if (!deletedOne) {
        throw new Error404();
      }
  
      await deletedOne.destroy({
        transaction,
      });
    }
    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
      {
        model: options.database.invoiceItems,
        as: 'Items',
      },
      {
        model: options.database.currency,
        as: 'currency',
      },
    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.invoice.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const where = {
      id: {
        [Op.in]: ids,
      },
      tenantId: currentTenant.id,
    };

    const records = await options.database.invoice.findAll(
      {
        attributes: ['id'],
        where,
      },
    );

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    return options.database.invoice.count(
      {
        where: {
          ...filter,
          tenantId: tenant.id,
        },
        transaction,
      },
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [];
    let include = [
      {
        model: options.database.invoiceItems,
        as: 'Items',
      },
      {
        model: options.database.currency,
        as: 'currency',
      },
    ];

    whereAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.id) {
        whereAnd.push({
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        });
      }

      if (filter.dueDateRange) {
        const [start, end] = filter.dueDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            dueDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            dueDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.currency) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'invoice',
            'currency',
            filter.currency,
          ),
        );
      }

      if (filter.invoiceNote) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'invoice',
            'invoiceNote',
            filter.invoiceNote,
          ),
        );
      }

      if (filter.shippingFeeRange) {
        const [start, end] = filter.shippingFeeRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            shippingFee: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            shippingFee: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.discountRange) {
        const [start, end] = filter.discountRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            discount: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            discount: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.taxRange) {
        const [start, end] = filter.taxRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            tax: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            tax: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.otherEmails) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'invoice',
            'otherEmails',
            filter.otherEmails,
          ),
        );
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.lte]: end,
            },
          });
        }
      }
    }

    const where = { [Op.and]: whereAnd };

    let {
      rows,
      count,
    } = await options.database.invoice.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [{
      tenantId: tenant.id,
    }];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },

        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.invoice.findAll(
      {
        attributes: ['id', 'id'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['id', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
        customerIds: data.customer,
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'invoice',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    output.customer = await record.getCustomer({
      transaction,
    });

    return output;
  }
}

export default InvoiceRepository;
