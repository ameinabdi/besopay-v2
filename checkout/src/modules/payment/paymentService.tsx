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

  static async pay(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      `/pay`,
      body,

    );

    return response.data;
  }

  static async successSession(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      `/success-payment`,
      body,

    );

    return response.data;
  }

  static async createSession(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      `/session-payment`,
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
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/payment/${id}`,
    );

    return response.data;
  }

  static async list(token, orderBy, limit, offset) {
    const params = {
      token,
    };

    const response = await authAxios.get(
      `/payment-config`,
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

    const response = await authAxios.get(
      `/payment/autocomplete`,
      {
        params,
      },
    );

    return response.data;
  }
}
