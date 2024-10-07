import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import PayRepository from '../database/repositories/payRepository';
import CustomerRepository from '../database/repositories/customerRepository';
import ProductRepository from '../database/repositories/productRepository';
import PaymentLinkRepository from '../database/repositories/paymentLinkRepository';
import InvoiceRepository from '../database/repositories/invoiceRepository';
import PaymentMethodRepository from '../database/repositories/paymentMethodRepository';
import CurrencyRepository from '../database/repositories/currencyRepository';
import jwt from 'jsonwebtoken';
import { getConfig } from '../config';

const BCRYPT_SALT_ROUNDS = 12;

export default class PaymentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
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

      const record = await PayRepository.create(data, {
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

  async createEncrypt(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );
    try {
     if(data.tenantId && data.amount && data.fullname && data.currency && data.reference){
      const record = await PayRepository.createEncrpty(data, {
        ...this.options,
        transaction,
      });
      await SequelizeRepository.commitTransaction(
        transaction,
      );
      return record;
     }else{
      throw "error";
     }

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
  async dencrypt(token) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );
    try {
      const data = await this.options.database.transactionLog.findOne(
        {
          where: {
            id:token,
          },
          transaction,
        },
      );
      if(data){
        let token = data.values
        const record = await this.options.database.tenant.findOne(
          {
            where: {
              id:token.tenantId,
            },
            transaction,
          },
        );
        token.tenantName = record.name
        await data.destroy({
          transaction,
        });
        await SequelizeRepository.commitTransaction(
          transaction,
        );
        return  token
      }else{
        throw "error";
      }
 
     } catch (error) {
       throw error;
     }
    
  }

  async createWithZaad(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
    
      const record = await PayRepository.createWithZaad(data, {
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

  async createWithEdahab(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
    
      const record = await PayRepository.createWithEdahab(data, {
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

      const record = await PayRepository.update(
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
        await PayRepository.destroy(id, {
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
    return PayRepository.findById(id, this.options);
  }


  async findCheckoutByToken(token) {
    return PayRepository.findCheckoutByToken(token, this.options);
  }


  async findAllAutocomplete(search, limit) {
    return PayRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return PayRepository.findAndCountAll(
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
    const count = await PayRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
