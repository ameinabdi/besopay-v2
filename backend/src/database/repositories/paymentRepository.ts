import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import axios from 'axios';
import CustomError400 from '../../errors/customError400';
import { getConfig } from '../../config';
var crypto = require('crypto');

const Op = Sequelize.Op;

class PaymentRepository {

  static async createPayment(data, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    if(data?.paymentMethod?.name === 'Waafi'){
      return await this.waafiPayment(data, options);
    }
    if(data?.paymentMethod?.name === 'Edahab'){
      return await this.edahabPayment(data, options);
    }
    if(data?.paymentMethod?.name === 'International Cards' || data?.paymentMethod?.name === 'Local Cards'){
      return await this.CardPayment(data, options);
    }
    
    else{
      console.log(data)
      throw new CustomError400(options, data);
    }
    
     
  
    // await this._createAuditLog(
    //   AuditLogRepository.CREATE,
    //   record,
    //   data,
    //   options,
    // );

  }


  static async waafiPayment(data, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );
    var paymentdata = {
      "schemaVersion": "1.0",
      "requestId": "123122",
      "timestamp": "2021-04-26 16:26:42.481",
      "channelName": "WEB",
      "serviceName": "API_PREAUTHORIZE",
      "serviceParams": {
          "merchantUid": "M0910248",
          "apiUserId": "1000328",
          "apiKey": "API-2071402845AHX",
          "paymentMethod": "MWALLET_ACCOUNT",
          "payerInfo": {
              "accountNo": '252'+parseInt(data?.phoneNumber),
          },
          "transactionInfo": {
              "referenceId": "REF1571118031",
              "invoiceId": "INV1571118031",
              "amount": parseFloat(data.payment?.amount),
              "currency": "USD",
              "description": 'tenant.name',
              "paymentBrand": "WAAFI / ZAAD / SAHAL / EVCPLUS / VISA/MASTERCARD",
              "transactionCategory": "ECOMMERCE / AIRLINE/ APPOINTMENTS "
              }
          }
      }
      try {
      
    const response =  await axios.post('https://api.waafipay.com/asm', paymentdata,
        {
          headers: { 
            'Content-Type': 'application/json'
          },
        })
        console.log('response333333',response)
    if(response.data.responseCode===2001 ||  response.data.responseCode==="2001" && response.data.params?.state === "APPROVED") {
      let record = await options.database.payment.findOne(      
        {
          where: {
            id:data?.payment?.id,
          },
          transaction,
        },
      );
  
      if (!record) {
        throw new Error404();
      }
  
      record = await record.update(
        {
          status:'Paid',
        },
        {
          transaction,
        },
      );

    const createTransaction = await options.database.transaction.create(
      {
        ...lodash.pick(data?.payment, [
          'amount',
          
          'paymentType',          
          'importHash',
        ]),
        'reference':response?.data?.params?.referenceId+' ('+data?.payment?.reference+')',
        'status':'Successful',
        paymentMethodId: data.paymentMethod?.id || null,
        currencyId: data?.payment?.currencyId || null,
        tenantId: data?.tenant.id,
      },
      {
        transaction,
      },
    );
    await options.database.transactionLog.create(
      {
        values: response.data,
        transactionId: createTransaction.id,
        timestamp: new Date(),
        tenantId: data?.tenant.id,
      },
      {
        transaction,
      },
    );

    return true;

    }else{
      throw new CustomError400(options.language, response.data?.responseMsg);
    }
  } catch (error:any) {
    // Handling Axios specific errors
    console.log('eeeee', error)
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new CustomError400(
        options.language,
        `Response Error: ${error.response.data?.responseMsg} - ${error.response.data}`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new CustomError400(
        options.language,
        "Network Error: No response received from server"
      );
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout error
      throw new CustomError400(
        options.language,
        "Request Timeout: The request took too long to complete"
      );
    } else if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") {
      // DNS or network-related errors
      throw new CustomError400(
        options.language,
        "Network Error: Unable to reach the server"
      );
    } else {
      // Something else went wrong
      throw new CustomError400(options.language, error);
    }
  }
  }
  static async edahabPayment(data, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );
    const edahabParams = {
      "apiKey": "F88l46bYOvzGeovniezQZUIjDQ12ERe8LaPr18Xb3",
      "edahabNumber": parseInt(data?.phoneNumber), 
      "amount":parseFloat(data.payment?.amount),
      "currency": data?.currency || "USD",
      "agentCode": "712420",
    }
    const EdahabEncoded = JSON.stringify(edahabParams);
    var Edahabhashed = crypto.createHash('SHA256').update(`${EdahabEncoded}xpiKjqr6zimbGjaUtq9lfaTkysAL2d1WUNkihN`).digest('hex');
    const url = `https://edahab.net/api/api/IssueInvoice?hash=${Edahabhashed}`;
    try {
    const response =  await axios.post(url,edahabParams,
      {
        headers: { 
          'Content-Type': 'application/json'
        },
      })

      if(response.data.invoiceStatus === 'Paid'){
       let record = await options.database.payment.findOne(      
        {
          where: {
            id:data?.payment?.id,
          },
          transaction,
        },
      );
  
      if (!record) {
        throw new Error404();
      }
  
      record = await record.update(
        {
          status:'Paid',
        },
        {
          transaction,
        },
      );

    const createTransaction = await options.database.transaction.create(
      {
        ...lodash.pick(data?.payment, [
          'amount',
          'reference',
          'paymentType',          
          'importHash',
        ]),
        'status':'Successful',
        paymentMethodId: data.paymentMethod?.id || null,
        currencyId: data?.payment?.currencyId || null,
        tenantId: data?.tenant.id,
      },
      {
        transaction,
      },
    );
    await options.database.transactionLog.create(
      {
        values: response.data,
        transactionId: createTransaction.id,
        timestamp: new Date(),
        tenantId: data?.tenant.id,
      },
      {
        transaction,
      },
    );

    return true;

    }else{
      throw new CustomError400(options.language, JSON.stringify('STATUS: '+response.data?.InvoiceStatus+" ERROR: "+response.data?.StatusDescription));
    }

  } catch (error:any) {
    // Handling Axios specific errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response error:", error.response.data);
      throw new CustomError400(
        options.language,
        `Response Error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      throw new CustomError400(
        options.language,
        "Network Error: No response received from server"
      );
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout error
      console.error("Timeout error:", error.message);
      throw new CustomError400(
        options.language,
        "Request Timeout: The request took too long to complete"
      );
    } else if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") {
      // DNS or network-related errors
      console.error("Network error:", error.message);
      throw new CustomError400(
        options.language,
        "Network Error: Unable to reach the server"
      );
    } else {
      // Something else went wrong
      console.error("Unexpected error:", error.message);
      throw new CustomError400(options.language, "An unexpected error occurred");
    }
  }
  }

  static async CardPayment(data, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );
   
   let record = await options.database.payment.findOne(      
        {
          where: {
            id:data?.payment,
          },
          transaction,
        },
      );
      if (!record) {
        throw new Error404();
      }
  
      record = await record.update(
        {
          status:'Paid',
        },
        {
          transaction,
        },
      );

      let PaymentLink = await options.database.paymentLink.findOne(      
        {
          where: {
            id:record?.paymentLinkId,
          },
          transaction,
        },
      );

    const createTransaction = await options.database.transaction.create(
      {
        'amount':record?.amount,
        'paymentType':record.paymentType,   
        'reference':data.resultIndicator,
        'status':'Successful',
        paymentMethodId: record.paymentMethodId || null,
        currencyId: record?.currencyId || null,
        tenantId: record?.tenantId || null,
      },
      {
        transaction,
      },
    );
    await options.database.transactionLog.create(
      {
        values: data.paymentResponse,
        transactionId: createTransaction.id,
        timestamp: new Date(),
        tenantId: record?.tenantId,
      },
      {
        transaction,
      },
    );

    return PaymentLink.redirecturl;
  }
  
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
  static async findByToken(reference, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
      {
        model: options.database.tenant,
        as: 'tenant',
      },
      {
        model: options.database.currency,
        as: 'currency',
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
    ];

    if(!reference){
      throw new CustomError400(options.language, 'Empty Reference');
    }

    const record = await options.database.payment.findOne(
      {
        where: {
          reference,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new CustomError400(options.language, 'No Found');

    }
    if (record.status === "Paid" || record.status === "Refund") {
      throw new CustomError400(options.language, 'Payment Expired');

    }

    return this._fillWithRelationsAndFiles(record, options);
  }
  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
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

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.payment.findOne(
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
    output.currency = output.currency?.currencyIso
    output.config =  {
      paymentMethods:[
        {
          name:'Wallet',
          description:'Waafi/Edahab Wallet',
          logo:'wallet.png',
          payment:[
            {
              id:'1',
              name:'Waafi',
              description:'(Evc/Zaad/Golis)',
              icon:'waafi.png',
              placeholder:'61/63/09',
              details:{}
            },
            {
              id:'2',
              name:'Edahab',
              description:'Edahab',
              icon:'edahab.png',
              placeholder:'65',
              details:{}
            },
            {
              id:'3',
              name:'Premier Wallet',
              description:'Premier Bank',
              icon:'premier.png',
              placeholder:'+252',
              details:{}
            }
          ]
        },
        {
          name:'Card',
          logo:'Card.png',
          description:'Visa/Master Cards',
          payment:[
            {
              id:'1',
              name:'International Cards',
              icon:'mastercard.png',
              details:{}
            },
          ]
        },
        {
          name:'Bank',
          logo:'Bank.png',
          description:'Intern/Local Banks',
          payment:[
            {
              id:'1',
              name:'Salaam Bank',
              details:{}
            },
            {
              id:'2',
              name:'IBS Bank',
              details:{}
            },
          ]
        }
      ],
    }

    return output;
  }
}

export default PaymentRepository;
