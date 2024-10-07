import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import jwt from 'jsonwebtoken';
import { getConfig } from '../config';
import PaymentRepository from '../database/repositories/paymentRepository';
import CustomerRepository from '../database/repositories/customerRepository';
import ProductRepository from '../database/repositories/productRepository';
import PaymentLinkRepository from '../database/repositories/paymentLinkRepository';
import InvoiceRepository from '../database/repositories/invoiceRepository';
import PaymentMethodRepository from '../database/repositories/paymentMethodRepository';
import CurrencyRepository from '../database/repositories/currencyRepository';
import Axios from 'axios';

export default class paymentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async checkoutGenerator(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {

      const token = jwt.sign(
        { 
          tenant:{
            name:'Datasom Technology Solutions'
          },
          payment:{
            amount: 500,
            currency:'USD',
            callbackUrl:'https://datasom.so'
          }
        
        },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );
      return token;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'country',
      );

      throw error;
    }
  }

  async createPayment(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {

      const record = await PaymentRepository.createPayment(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'country',
      );

      throw error;
    }
  }

  async sessionPayment(data) {
    const merchantId = getConfig().MASTERPASS_MERCHANT_ID;
    const apiPassword = getConfig().MASTERPASS_API_PASSWORD;
    const auth = Buffer.from(`merchant.${merchantId}:${apiPassword}`).toString('base64');
    let payload = JSON.stringify({
      "apiOperation": "INITIATE_CHECKOUT",
      "interaction": {
        "operation": "PURCHASE",
        "returnUrl":`${getConfig().FRONTEND_URL}/success?payment=`+data?.id,
        "merchant": {
          "name": data?.tenant?.name
        },
        "displayControl":{
            billingAddress:'HIDE',
            customerEmail:'HIDE'
        },
      },
      "order": {
        "currency": data?.currency || "USD",
        "amount":  data?.amount || 0,
        "id": data?.id+'3',
        "description":data?.paymentType
      }
    });
    
    try {

      const response = await Axios.post(
        `${getConfig().MASTERPASS_API_URL}/merchant/${merchantId}/session`,
        payload,
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data?.session?.id;
    } catch (error:any) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
  
        // Throw the error response for further handling
        throw new Error(`API Error: ${error.response.data.error.explanation || 'Unknown error'}`);
      } else if (error.request) {
        // No response was received from the server
        console.error('No response received:', error.request);
        throw new Error('No response received from Mastercard API');
      } else {
        // Something else happened during the request setup
        console.error('Error setting up the request:', error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  }


  async successPayment(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
     
      const record = await PaymentRepository.CardPayment(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'payment',
      );

      throw error;
    }
  }

  async paymentDetail({ token }) {
   
    return PaymentRepository.findByToken(token, this.options);
 
  }
  
  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.customer = await CustomerRepository.filterIdInTenant(data.customer, { ...this.options, transaction });
      data.product = await ProductRepository.filterIdInTenant(data.product, { ...this.options, transaction });
      data.paymentLink = await PaymentLinkRepository.filterIdInTenant(data.paymentLink, { ...this.options, transaction });
      data.invoice = await InvoiceRepository.filterIdInTenant(data.invoice, { ...this.options, transaction });
      data.paymentMethod = await PaymentMethodRepository.filterIdInTenant(data.paymentMethod, { ...this.options, transaction });
      data.currency = await CurrencyRepository.filterIdInTenant(data.currency, { ...this.options, transaction });

      const record = await PaymentRepository.create(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'payment',
      );

      throw error;
    }
  }
  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.customer = await CustomerRepository.filterIdInTenant(data.customer, { ...this.options, transaction });
      data.product = await ProductRepository.filterIdInTenant(data.product, { ...this.options, transaction });
      data.paymentLink = await PaymentLinkRepository.filterIdInTenant(data.paymentLink, { ...this.options, transaction });
      data.invoice = await InvoiceRepository.filterIdInTenant(data.invoice, { ...this.options, transaction });
      data.paymentMethod = await PaymentMethodRepository.filterIdInTenant(data.paymentMethod, { ...this.options, transaction });
      data.currency = await CurrencyRepository.filterIdInTenant(data.currency, { ...this.options, transaction });

      const record = await PaymentRepository.update(
        id,
        data,
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'payment',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await PaymentRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return PaymentRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return PaymentRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return PaymentRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await PaymentRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
