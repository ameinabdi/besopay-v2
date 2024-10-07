import Roles from 'src/security/roles';
import Plans from 'src/security/plans';
import Storage from 'src/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        entity:'tenant',
        type:'edit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        entity:'tenant',
        type: 'trash',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        entity:'plan',
        type:'edit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        entity:'plan',
        type:'list',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      
      userEdit: {
        id: 'userEdit',
        entity:'user',
        type:'edit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        entity:'user',
        type: 'trash',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        entity:'user',
        type:'add',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        entity:'user',
        type:'import',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        entity:'user',
        type:'list',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userView: {
        id: 'userView',
        entity:'user',
        type:'view',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        name:'user',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      accountcenterImport: {
        id: 'accountcenterImport',
        type:'import',
        entity:'accountcenter',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      accountcenterCreate: {
        id: 'accountcenterCreate',
        type:'add',
        entity:'accountcenter',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      accountcenterEdit: {
        id: 'accountcenterEdit',
        type:'edit',
        entity:'accountcenter',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      accountcenterDestroy: {
        id: 'accountcenterDestroy',
        type:'trash',
        entity:'accountcenter',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      countryImport: {
        id: 'countryImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      countryCreate: {
        id: 'countryCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      countryEdit: {
        id: 'countryEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      countryDestroy: {
        id: 'countryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      countryRead: {
        id: 'countryRead',
        allowedRoles: [roles.admin,],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      countryAutocomplete: {
        id: 'countryAutocomplete',
        allowedRoles: [roles.admin,],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      accountcenterRead: {
        id: 'accountcenterRead',
        type:'list',
        entity:'accountcenter',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      accountcenterAutocomplete: {
        id: 'accountcenterAutocomplete',
        type:'list',
        entity:'accountcenter',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      rolesImport: {
        id: 'rolesImport',
        type:'import',
        entity:'roles',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      rolesCreate: {
        id: 'rolesCreate',
        type:'add',
        entity:'roles',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      rolesEdit: {
        id: 'rolesEdit',
        entity:'roles',
        type:'edit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      rolesDestroy: {
        id: 'rolesDestroy',
        entity:'roles',
        type: 'trash',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      rolesRead: {
        id: 'rolesRead',
        type:'list',
        entity:'roles',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      rolesView: {
        id: 'rolesView',
        type:'',
        entity:'roles',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      rolesAutocomplete: {
        id: 'rolesAutocomplete',
        type:'list',
        name:'roles',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      permissionImport: {
        id: 'permissionImport',
        type:'import',
        entity:'permission',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      permissionCreate: {
        id: 'permissionCreate',
        type:'add',
        entity:'permission',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      permissionEdit: {
        id: 'permissionEdit',
        type:'edit',
        entity:'permission',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      permissionDestroy: {
        id: 'permissionDestroy',
        type:'trash',
        entity:'permission',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      permissionView: {
        id: 'permissionView',
        type:'',
        entity:'permission',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      permissionRead: {
        id: 'permissionRead',
        type:'list',
        entity:'permission',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      permissionAutocomplete: {
        id: 'permissionAutocomplete',
        type:'list',
        name:'permission',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      auditLogRead: {
        id: 'auditLogRead',
        entity:'auditLog',
        type:'list',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogView: {
        id: 'auditLogView',
        entity:'auditLog',
        type:'view',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        entity:'settings',
        type:'edit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
