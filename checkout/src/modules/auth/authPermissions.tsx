
export default class AuthPermissions {
 

  static get() {
    const tenantASString =
      localStorage.getItem('tenant') || null;

    if (tenantASString) {
      return JSON.parse(tenantASString).id;
    }

    return null;
  }

  static getSettings() {
    const tenantASString =
      localStorage.getItem('tenant') || null;

    if (tenantASString) {
      const tenant = JSON.parse(tenantASString);

      if (tenant) {
        if (Array.isArray(tenant.settings)) {
          if (tenant.settings.length) {
            return tenant.settings[0];
          }
        } else {
          return tenant.settings;
        }
      }
    }
    return null;
  }

  static set(tenant) {
    if (!tenant) {
      return this.clear();
    }
    localStorage.setItem('tenant', JSON.stringify(tenant));
  }

  static clear() {
    localStorage.removeItem('tenant');
  }
}
