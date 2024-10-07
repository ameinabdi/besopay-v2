import Roles from './roles';
import Plans from './plans';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values()  {
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
      businessImport: {
        id: 'businessImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      businessCreate: {
        id: 'businessCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      businessEdit: {
        id: 'businessEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      businessDestroy: {
        id: 'businessDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      businessRead: {
        id: 'businessRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      businessAutocomplete: {
        id: 'businessAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      customerImport: {
        id: 'customerImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      customerCreate: {
        id: 'customerCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      customerEdit: {
        id: 'customerEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      customerDestroy: {
        id: 'customerDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      customerRead: {
        id: 'customerRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      customerAutocomplete: {
        id: 'customerAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      storeImport: {
        id: 'storeImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      storeCreate: {
        id: 'storeCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.storeStoreImage,
        ],
      },
      storeEdit: {
        id: 'storeEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.storeStoreImage,
        ],
      },
      storeDestroy: {
        id: 'storeDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.storeStoreImage,
        ],
      },
      storeRead: {
        id: 'storeRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      storeAutocomplete: {
        id: 'storeAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      shippingImport: {
        id: 'shippingImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      shippingCreate: {
        id: 'shippingCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      shippingEdit: {
        id: 'shippingEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      shippingDestroy: {
        id: 'shippingDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      shippingRead: {
        id: 'shippingRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      shippingAutocomplete: {
        id: 'shippingAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      productCategoryImport: {
        id: 'productCategoryImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      productCategoryCreate: {
        id: 'productCategoryCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      productCategoryEdit: {
        id: 'productCategoryEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      productCategoryDestroy: {
        id: 'productCategoryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      productCategoryRead: {
        id: 'productCategoryRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      productCategoryAutocomplete: {
        id: 'productCategoryAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      productImport: {
        id: 'productImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      productCreate: {
        id: 'productCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.productProductImages,
        ],
      },
      productEdit: {
        id: 'productEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.productProductImages,
        ],
      },
      productDestroy: {
        id: 'productDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.productProductImages,
        ],
      },
      productRead: {
        id: 'productRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      productAutocomplete: {
        id: 'productAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      productOptionsImport: {
        id: 'productOptionsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      productOptionsCreate: {
        id: 'productOptionsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      productOptionsEdit: {
        id: 'productOptionsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      productOptionsDestroy: {
        id: 'productOptionsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      productOptionsRead: {
        id: 'productOptionsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      productOptionsAutocomplete: {
        id: 'productOptionsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      paymentLinkImport: {
        id: 'paymentLinkImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      paymentLinkCreate: {
        id: 'paymentLinkCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      paymentLinkEdit: {
        id: 'paymentLinkEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      paymentLinkDestroy: {
        id: 'paymentLinkDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      paymentLinkRead: {
        id: 'paymentLinkRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      paymentLinkAutocomplete: {
        id: 'paymentLinkAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      invoiceImport: {
        id: 'invoiceImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      invoiceCreate: {
        id: 'invoiceCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      invoiceEdit: {
        id: 'invoiceEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      invoiceDestroy: {
        id: 'invoiceDestroy',
        allowedRoles: [roles.admin,],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      invoiceRead: {
        id: 'invoiceRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      invoiceAutocomplete: {
        id: 'invoiceAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      invoiceItemsImport: {
        id: 'invoiceItemsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      invoiceItemsCreate: {
        id: 'invoiceItemsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      invoiceItemsEdit: {
        id: 'invoiceItemsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      invoiceItemsDestroy: {
        id: 'invoiceItemsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      invoiceItemsRead: {
        id: 'invoiceItemsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      invoiceItemsAutocomplete: {
        id: 'invoiceItemsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      banksImport: {
        id: 'banksImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      banksCreate: {
        id: 'banksCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      banksEdit: {
        id: 'banksEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      banksDestroy: {
        id: 'banksDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      banksRead: {
        id: 'banksRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      banksAutocomplete: {
        id: 'banksAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      businessAccountsImport: {
        id: 'businessAccountsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      businessAccountsCreate: {
        id: 'businessAccountsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      businessAccountsEdit: {
        id: 'businessAccountsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      businessAccountsDestroy: {
        id: 'businessAccountsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      businessAccountsRead: {
        id: 'businessAccountsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      businessAccountsAutocomplete: {
        id: 'businessAccountsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      businessDocumentsImport: {
        id: 'businessDocumentsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      businessDocumentsCreate: {
        id: 'businessDocumentsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.businessDocumentsDocument,
        ],
      },
      businessDocumentsEdit: {
        id: 'businessDocumentsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.businessDocumentsDocument,
        ],
      },
      businessDocumentsDestroy: {
        id: 'businessDocumentsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.businessDocumentsDocument,
        ],
      },
      businessDocumentsRead: {
        id: 'businessDocumentsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      businessDocumentsAutocomplete: {
        id: 'businessDocumentsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      currencyImport: {
        id: 'currencyImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      currencyCreate: {
        id: 'currencyCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      currencyEdit: {
        id: 'currencyEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      currencyDestroy: {
        id: 'currencyDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      currencyRead: {
        id: 'currencyRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      currencyAutocomplete: {
        id: 'currencyAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      paymentImport: {
        id: 'paymentImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      paymentCreate: {
        id: 'paymentCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      paymentEdit: {
        id: 'paymentEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      paymentDestroy: {
        id: 'paymentDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      paymentRead: {
        id: 'paymentRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      paymentAutocomplete: {
        id: 'paymentAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      paymentMethodImport: {
        id: 'paymentMethodImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      paymentMethodCreate: {
        id: 'paymentMethodCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.paymentMethodPaymentMethodLogo,
          storage.paymentMethodPaymentMethodThumbnail,
        ],
      },
      paymentMethodEdit: {
        id: 'paymentMethodEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.paymentMethodPaymentMethodLogo,
          storage.paymentMethodPaymentMethodThumbnail,
        ],
      },
      paymentMethodDestroy: {
        id: 'paymentMethodDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.paymentMethodPaymentMethodLogo,
          storage.paymentMethodPaymentMethodThumbnail,
        ],
      },
      paymentMethodRead: {
        id: 'paymentMethodRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      paymentMethodAutocomplete: {
        id: 'paymentMethodAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      withdrawImport: {
        id: 'withdrawImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      withdrawCreate: {
        id: 'withdrawCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      withdrawEdit: {
        id: 'withdrawEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      withdrawDestroy: {
        id: 'withdrawDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      withdrawRead: {
        id: 'withdrawRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      withdrawAutocomplete: {
        id: 'withdrawAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      locationsImport: {
        id: 'locationsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      locationsCreate: {
        id: 'locationsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      locationsEdit: {
        id: 'locationsEdit',
        allowedRoles: [roles.admin ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      locationsDestroy: {
        id: 'locationsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      locationsRead: {
        id: 'locationsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      locationsAutocomplete: {
        id: 'locationsAutocomplete',
        allowedRoles: [roles.admin ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      categoryImport: {
        id: 'categoryImport',
        allowedRoles: [roles.admin ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      categoryCreate: {
        id: 'categoryCreate',
        allowedRoles: [roles.admin ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.categoryThumnail,
        ],
      },
      categoryEdit: {
        id: 'categoryEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.categoryThumnail,
        ],
      },
      categoryDestroy: {
        id: 'categoryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.categoryThumnail,
        ],
      },
      categoryRead: {
        id: 'categoryRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      categoryAutocomplete: {
        id: 'categoryAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      refundImport: {
        id: 'refundImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      refundCreate: {
        id: 'refundCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      refundEdit: {
        id: 'refundEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      refundDestroy: {
        id: 'refundDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      refundRead: {
        id: 'refundRead',
        allowedRoles: [roles.admin ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      refundAutocomplete: {
        id: 'refundAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      transactionImport: {
        id: 'transactionImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      transactionCreate: {
        id: 'transactionCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      transactionEdit: {
        id: 'transactionEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      transactionDestroy: {
        id: 'transactionDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      transactionRead: {
        id: 'transactionRead',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      transactionAutocomplete: {
        id: 'transactionAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
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
      entityImport: {
        id: 'entityImport',
        entity:'entity',
        type:'import',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      entityCreate: {
        id: 'entityCreate',
        entity:'entity',
        type:'add',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.entityFiles,
          storage.entityImages,
        ],
      },
      entityEdit: {
        id: 'entityEdit',
        entity:'entity',
        type:'edit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.entityFiles,
          storage.entityImages,
        ],
      },
      entityDestroy: {
        id: 'entityDestroy',
        entity:'entity',
        type: 'trash',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.entityFiles,
          storage.entityImages,
        ],
      },
      entityRead: {
        id: 'entityRead',
        entity:'entity',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      entityView: {
        id: 'entityView',
        entity:'entity',
        type:'view',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      entityAutocomplete: {
        id: 'entityAutocomplete',
        name:'entity',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      rolesImport: {
        id: 'rolesImport',
        entity:'roles',
        type:'import',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      rolesCreate: {
        id: 'rolesCreate',
        entity:'roles',
        type:'add',
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
        entity:'roles',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      rolesView: {
        id: 'rolesView',
        entity:'roles',
        type:'view',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      rolesAutocomplete: {
        id: 'rolesAutocomplete',
        name:'roles',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      permissionImport: {
        id: 'permissionImport',
        entity:'permission',
        type:'import',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      permissionCreate: {
        id: 'permissionCreate',
        entity:'permission',
        type:'add',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      permissionEdit: {
        id: 'permissionEdit',
        entity:'permission',
        type:'edit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      permissionDestroy: {
        id: 'permissionDestroy',
        entity:'permission',
        type: 'trash',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      permissionView: {
        id: 'permissionView',
        entity:'permission',
        type:'view',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      permissionRead: {
        id: 'permissionRead',
        entity:'permission',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      permissionAutocomplete: {
        id: 'permissionAutocomplete',
        name:'permission',
        type:'list',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
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
