import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import { v4 } from 'uuid';
import { getConfig } from '../../config';

const Op = Sequelize.Op;

class PaymentLinkRepository {

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
    const reference = v4()

    const record = await options.database.paymentLink.create(
      {
        ...lodash.pick(data, [
          'paymentLinkName',
          'amount',
          'description',
          'redirecturl',
          'typePaymentLink',
          'interval',
          'numberOfTime',
          'donationWebsite',
          'donationTelephone',          
          'importHash',
        ]),
        customurl:reference,
        currencyId: data.currency,
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );
   
    await options.database.payment.create(
      {
        ...lodash.pick(data, [
          'amount',
          'importHash',
        ]),
        'paymentType':'Payment Link',
        status:'Pending',
        reference:reference,
        paymentLinkId: record.id || null,
        currencyId: data.currency || null,
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );
    
  
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

    let record = await options.database.paymentLink.findOne(      
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

    record = await record.update(
      {
        ...lodash.pick(data, [
          'paymentLinkName',
          'currency',
          'amount',
          'description',
          'customurl',
          'redirecturl',
          'typePaymentLink',
          'interval',
          'numberOfTime',
          'donationWebsite',
          'donationTelephone',          
          'importHash',
        ]),

        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );





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

    let record = await options.database.paymentLink.findOne(
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
        model: options.database.currency,
        as: 'currency',
      },
    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.paymentLink.findOne(
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

    const records = await options.database.paymentLink.findAll(
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

    return options.database.paymentLink.count(
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

      if (filter.paymentLinkName) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'paymentLinkName',
            filter.paymentLinkName,
          ),
        );
      }

      if (filter.currency) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'currency',
            filter.currency,
          ),
        );
      }

      if (filter.amountRange) {
        const [start, end] = filter.amountRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            amount: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            amount: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.description) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'description',
            filter.description,
          ),
        );
      }

      if (filter.customurl) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'customurl',
            filter.customurl,
          ),
        );
      }

      if (filter.redirecturl) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'redirecturl',
            filter.redirecturl,
          ),
        );
      }

      if (filter.typePaymentLink) {
        whereAnd.push({
          typePaymentLink: filter.typePaymentLink,
        });
      }

      if (filter.interval) {
        whereAnd.push({
          interval: filter.interval,
        });
      }

      if (filter.numberOfTimeRange) {
        const [start, end] = filter.numberOfTimeRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            numberOfTime: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            numberOfTime: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.donationWebsite) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'donationWebsite',
            filter.donationWebsite,
          ),
        );
      }

      if (filter.donationTelephone) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'paymentLink',
            'donationTelephone',
            filter.donationTelephone,
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
    } = await options.database.paymentLink.findAndCountAll({
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
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'paymentLink',
              'paymentLinkName',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.paymentLink.findAll(
      {
        attributes: ['id', 'paymentLinkName'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['paymentLinkName', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.paymentLinkName,
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

      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'paymentLink',
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
    output.customurl =  `${getConfig().FRONTEND_URL}/checkout?token=${output.customurl}`;

    return output;
  }
}

export default PaymentLinkRepository;
