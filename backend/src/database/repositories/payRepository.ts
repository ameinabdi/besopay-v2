import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import Error400 from '../../errors/customError400';
import axios from 'axios';
import crypto from 'crypto';


const Op = Sequelize.Op;

class PaymentRepository {

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

    const record = await options.database.payment.create(
      {
        ...lodash.pick(data, [
          'paymentType',
          'amount',
          'paid',          
          'importHash',
        ]),
        customerId: data.customer || null,
        productId: data.product || null,
        paymentLinkId: data.paymentLink || null,
        invoiceId: data.invoice || null,
        paymentMethodId: data.paymentMethod || null,
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


  static async createEncrpty(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await options.database.transactionLog.create(
      {
        values: data,
        timestamp: new Date()
      },
      {
        transaction,
      },
    );
    return record.id;
  }


  static async createWithZaad(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );
    let currency = await options.database.currency.findOne(      
      {
        where: {
          currencyIso:data.currency,
        },
        transaction,
      },
    );
    if (!currency) {
      throw new Error400(
        options.language,
        "No Currency Found",
      );
    }

    var paymentdata = {
      "schemaVersion": "1.0",
      "requestId": "123122",
      "timestamp": "2021-04-26 16:26:42.481",
      "channelName": "WEB",
      "serviceName": "API_PURCHASE",
      "sessionId": "1233456789",
      "serviceParams": {
          "merchantUid": "M0910345",
          "apiUserId": "1000549",
          "apiKey": "API-990427508AHX",
          "paymentMethod": "MWALLET_ACCOUNT",
          "payerInfo": {
            "accountNo": data.telephone,
          },
          "pgAccountId": "20001236",
          "transactionInfo": {
              "referenceId": "REF1571118031",
              "invoiceId": "INV1571118031",
              "amount": data.totalAmount,
              // "amount":"500",
              "currency"      : "USD",
              "description": "Test"
          }
      }
     }
     const customer = await options.database.customer.create(
      {
        ...lodash.pick(data, [
          'fullname',
          'email',
          'telephone',          
          'importHash',
        ]),
        tenantId: data.tenantId,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );
    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let paymentMethod = await options.database.paymentMethod.findOne(      
      {
        where: {
          paymentMethodName:'Zaad',
        },
        transaction,
      },
    );

    if (!paymentMethod) {
      throw new Error404();
    }


    const response =  await axios.post('https://api.waafi.com/asm', paymentdata,
      {
        headers: { 
          'Content-Type': 'application/json'
        },
      })
     if(response.data.responseCode===2001 ||  response.data.responseCode==="2001") {
       
        
          
        const record = await options.database.transaction.create(
          {
            ...lodash.pick(data, [
              'importHash',
            ]),
            paymentType:'Product',
            amount:data.totalAmount,
            status:'Successful',
            reference:response.data?.params?.transactionId+'-'+data.reference,
            customerId: customer.id || null,
            paymentMethodId: paymentMethod.id || null,
            currencyId: currency.id || null,
            tenantId: data.tenantId,
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
    
        return record
      }else{
        const record = await options.database.transaction.create(
          {
            ...lodash.pick(data, [
              'importHash',
            ]),
            paymentType:'Product',
            amount:data.totalAmount,
            status:'Failed',
            reference:response.data?.responseMsg,
            paymentMethodId: paymentMethod.id || null,
            customerId: customer.id || null,
            currencyId: currency.id || null,
            tenantId: data.tenantId,
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
    
        return record
        // throw new Error400(
        //   options.language,
        //   response.data?.responseMsg,
        // );
      }
  
  }


  static async createWithEdahab(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );
    let currency = await options.database.currency.findOne(      
      {
        where: {
          currencyIso:data.currency,
        },
        transaction,
      },
    );

    if (!currency) {
      throw new Error404();
    }
    var paymentdata = {
      "apiKey":"F88l46bYOvzGeovniezQZUIjDQ12ERe8LaPr18Xb3",
      "edahabNumber": data.telephone.slice(3),
      "amount": "3333",
      "currency":"SLSH",
      "agentCode": "712420",
      "returnUrl": "https://checkout.besopay.com"
     }
   
     const EdahabFromEncoded = JSON.stringify(paymentdata);
     var EdahabFromhashed = crypto.createHash('SHA256').update(`${EdahabFromEncoded}xpiKjqr6zimbGjaUtq9lfaTkysAL2d1WUNkihN`).digest('hex');
     const response =  await axios.post('https://edahab.net/api/api/IssueInvoice?hash='+EdahabFromhashed,paymentdata,
     {
       headers: { 
         'Content-Type': 'application/json'
       },
     })
     if(response.data.invoiceStatus === 'Paid'){
      const customer = await options.database.customer.create(
        {
          ...lodash.pick(data, [
            'fullname',
            'email',
            'telephone',          
            'importHash',
          ]),
          tenantId: data.tenantId,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        {
          transaction,
        },
      );
      const currentTenant = SequelizeRepository.getCurrentTenant(
        options,
      );
  
      let paymentMethod = await options.database.paymentMethod.findOne(      
        {
          where: {
            paymentMethodName:'Zaad',
          },
          transaction,
        },
      );
  
      if (!paymentMethod) {
        throw new Error404();
      }

      const record = await options.database.payment.create(
        {
          ...lodash.pick(data, [
            'paymentType',
            'amount',
             'importHash',
          ]),
          status:'Paid',
          reference:response.data?.invoiceId,
          customerId: customer.id || null,
          paymentLinkId: data.paymentLink || null,
          invoiceId: data.invoice || null,
          paymentMethodId: paymentMethod.id || null,
          currencyId: currency.id || null,
          tenantId: data.tenantId,
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
      }else{
        console.log('eee',paymentdata, response.data)
        throw new Error400(
          options.language,
          response.data
        );
      }
  
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

    let record = await options.database.payment.findOne(      
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
          'paymentType',
          'amount',
          'paid',          
          'importHash',
        ]),
        customerId: data.customer || null,
        productId: data.product || null,
        paymentLinkId: data.paymentLink || null,
        invoiceId: data.invoice || null,
        paymentMethodId: data.paymentMethod || null,
        currencyId: data.currency || null,
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

    let record = await options.database.payment.findOne(
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

    ];
    const record = await options.database.paymentLink.findOne(
      {
        where: {
          id,
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



  static async findCheckoutByToken(token, options: IRepositoryOptions) {
    // const transaction = SequelizeRepository.getTransaction(
    //   options,
    // );

    // const include = [

    // ];
    // const record = await options.database.paymentLink.findOne(
    //   {
    //     where: {
    //       id:token,
    //     },
    //     include,
    //     transaction,
    //   },
    // );

    // if (!record) {
    //   throw new Error404();
    // }
    const data ={
      id:'13f2443e-441c-4fef-bcc1-4fedb5400785',
      businessName: "beso pay",
      businessEmail:'besopay@gmail.com',
      price:330.43,
      currency:'USD'
    }


    return data;
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

    const records = await options.database.payment.findAll(
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

    return options.database.payment.count(
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
        model: options.database.customer,
        as: 'customer',
      },
      {
        model: options.database.product,
        as: 'product',
      },
      {
        model: options.database.paymentLink,
        as: 'paymentLink',
      },
      {
        model: options.database.invoice,
        as: 'invoice',
      },
      {
        model: options.database.paymentMethod,
        as: 'paymentMethod',
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

      if (filter.customer) {
        whereAnd.push({
          ['customerId']: SequelizeFilterUtils.uuid(
            filter.customer,
          ),
        });
      }

      if (filter.paymentType) {
        whereAnd.push({
          paymentType: filter.paymentType,
        });
      }

      if (filter.product) {
        whereAnd.push({
          ['productId']: SequelizeFilterUtils.uuid(
            filter.product,
          ),
        });
      }

      if (filter.paymentLink) {
        whereAnd.push({
          ['paymentLinkId']: SequelizeFilterUtils.uuid(
            filter.paymentLink,
          ),
        });
      }

      if (filter.invoice) {
        whereAnd.push({
          ['invoiceId']: SequelizeFilterUtils.uuid(
            filter.invoice,
          ),
        });
      }

      if (filter.paymentMethod) {
        whereAnd.push({
          ['paymentMethodId']: SequelizeFilterUtils.uuid(
            filter.paymentMethod,
          ),
        });
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

      if (
        filter.paid === true ||
        filter.paid === 'true' ||
        filter.paid === false ||
        filter.paid === 'false'
      ) {
        whereAnd.push({
          paid:
            filter.paid === true ||
            filter.paid === 'true',
        });
      }

      if (filter.currency) {
        whereAnd.push({
          ['currencyId']: SequelizeFilterUtils.uuid(
            filter.currency,
          ),
        });
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
    } = await options.database.payment.findAndCountAll({
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

    const records = await options.database.payment.findAll(
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

      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'payment',
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



    return output;
  }
}

export default PaymentRepository;
