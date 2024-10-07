import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class PaymentService {
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/payment/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/payment`,
      {
        params,
      },
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/payment`,
      body,
    );

    return response.data;
  }


  static async createWithZaad(data) {
    const body = {
      data,
    };


    const response = await authAxios.post(
      `/pay-with-zaad`,
      body,
    );

    return response.data;
  }

  static async createWithEdahab(data) {
    const body = {
      data,
    };


    const response = await authAxios.post(
      `/pay-with-edahab`,
      body,
    );
    return response.data;
  }

  static async import(values, importHash) {
    const body = {
      data: values,
      importHash,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/payment/import`,
      body,
    );

    return response.data;
  }

  static async find(id) {

    const response = await authAxios.get(
      `/pay/${id}`,
    );

    return response.data;
  }


  static async findcheckout(token) {

    const response = await authAxios.get(
      `/dencrypt-payload/${token}`,
    );

    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/payment`,
      {
        params,
      },
    );

    return response.data;
  }

  static async listAutocomplete(query, limit) {
    const params = {
      query,
      limit,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/payment/autocomplete`,
      {
        params,
      },
    );

    return response.data;
  }
}
