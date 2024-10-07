import config from 'src/config';
import Permissions from 'src/security/permissions';

const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
    entity:{
      name:'dashboard',
      type: 'list'
    },
  },

  {
    path: '/profile',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    entity:{
      name:'profile',
      type: 'view'
    },
  },

  {
    path: '/password-change',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
    entity:{
      name:'password-change',
      type: 'view'
    },
  },

  {
    path: '/tenant',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
    entity:{
      name:'tenant',
      type: 'view'
    },
  },
  {
    path: '/tenant/new',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
    entity:{
      name:'tenant',
      type: 'add'
    },
  },
  {
    path: '/tenant/:id/edit',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
    entity:{
      name:'tenant',
      type: 'edit'
    },
  },

  config.isPlanEnabled && {
    path: '/plan',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
    entity:{
      name:'plan',
      type: 'list'
    },
  },
  {
    path: '/admin',
    loader: () => import('src/view/admin/AdminPage'),
    permissionRequired: permissions.userRead,
    exact: true,
    entity:{
      name:'admin',
      type: 'list'
    },
  },

  {
    path: '/user',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
    entity:{
      name:'user',
      type: 'list'
    },
  },

  {
    path: '/user/new',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
    entity:{
      name:'user',
      type: 'add'
    },
  },

  {
    path: '/user/importer',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
    entity:{
      name:'user',
      type: 'import'
    },
  },
  {
    path: '/user/:id/edit',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
    entity:{
      name:'user',
      type: 'edit'
    },
  },
  {
    path: '/user/:id',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
    entity:{
      name:'user',
      type: 'view'
    },
  },

  {
    path: '/audit-logs',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
    entity:{
      name:'audit',
      type: 'list'
    },
  },

  {
    path: '/settings',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    entity:{
      name:'settings',
      type: 'list'
    },
  },
  {
    path: '/business',
    loader: () =>
      import('src/view/business/list/BusinessListPage'),
    permissionRequired: permissions.businessRead,
    exact: true,
  },
  {
    path: '/business/new',
    loader: () =>
      import('src/view/business/form/BusinessFormPage'),
    permissionRequired: permissions.businessCreate,
    exact: true,
  },
  {
    path: '/business/importer',
    loader: () =>
      import(
        'src/view/business/importer/BusinessImporterPage'
      ),
    permissionRequired: permissions.businessImport,
    exact: true,
  },
  {
    path: '/business/:id/edit',
    loader: () =>
      import('src/view/business/form/BusinessFormPage'),
    permissionRequired: permissions.businessEdit,
    exact: true,
  },
  {
    path: '/business/:id',
    loader: () =>
      import('src/view/business/view/BusinessViewPage'),
    permissionRequired: permissions.businessRead,
    exact: true,
  },

  {
    path: '/customer',
    loader: () =>
      import('src/view/customer/list/CustomerListPage'),
    permissionRequired: permissions.customerRead,
    exact: true,
  },
  {
    path: '/customer/new',
    loader: () =>
      import('src/view/customer/form/CustomerFormPage'),
    permissionRequired: permissions.customerCreate,
    exact: true,
  },
  {
    path: '/customer/importer',
    loader: () =>
      import(
        'src/view/customer/importer/CustomerImporterPage'
      ),
    permissionRequired: permissions.customerImport,
    exact: true,
  },
  {
    path: '/customer/:id/edit',
    loader: () =>
      import('src/view/customer/form/CustomerFormPage'),
    permissionRequired: permissions.customerEdit,
    exact: true,
  },
  {
    path: '/customer/:id',
    loader: () =>
      import('src/view/customer/view/CustomerViewPage'),
    permissionRequired: permissions.customerRead,
    exact: true,
  },

  {
    path: '/store',
    loader: () =>
      import('src/view/store/list/StoreListPage'),
    permissionRequired: permissions.storeRead,
    exact: true,
  },
  {
    path: '/store/new',
    loader: () =>
      import('src/view/store/form/StoreFormPage'),
    permissionRequired: permissions.storeCreate,
    exact: true,
  },
  {
    path: '/store/importer',
    loader: () =>
      import(
        'src/view/store/importer/StoreImporterPage'
      ),
    permissionRequired: permissions.storeImport,
    exact: true,
  },
  {
    path: '/store/:id/edit',
    loader: () =>
      import('src/view/store/form/StoreFormPage'),
    permissionRequired: permissions.storeEdit,
    exact: true,
  },
  {
    path: '/store/:id',
    loader: () =>
      import('src/view/store/view/StoreViewPage'),
    permissionRequired: permissions.storeRead,
    exact: true,
  },

  {
    path: '/shipping',
    loader: () =>
      import('src/view/shipping/list/ShippingListPage'),
    permissionRequired: permissions.shippingRead,
    exact: true,
  },
  {
    path: '/shipping/new',
    loader: () =>
      import('src/view/shipping/form/ShippingFormPage'),
    permissionRequired: permissions.shippingCreate,
    exact: true,
  },
  {
    path: '/shipping/importer',
    loader: () =>
      import(
        'src/view/shipping/importer/ShippingImporterPage'
      ),
    permissionRequired: permissions.shippingImport,
    exact: true,
  },
  {
    path: '/shipping/:id/edit',
    loader: () =>
      import('src/view/shipping/form/ShippingFormPage'),
    permissionRequired: permissions.shippingEdit,
    exact: true,
  },
  {
    path: '/shipping/:id',
    loader: () =>
      import('src/view/shipping/view/ShippingViewPage'),
    permissionRequired: permissions.shippingRead,
    exact: true,
  },

  {
    path: '/product-category',
    loader: () =>
      import('src/view/productCategory/list/ProductCategoryListPage'),
    permissionRequired: permissions.productCategoryRead,
    exact: true,
  },
  {
    path: '/product-category/new',
    loader: () =>
      import('src/view/productCategory/form/ProductCategoryFormPage'),
    permissionRequired: permissions.productCategoryCreate,
    exact: true,
  },
  {
    path: '/product-category/importer',
    loader: () =>
      import(
        'src/view/productCategory/importer/ProductCategoryImporterPage'
      ),
    permissionRequired: permissions.productCategoryImport,
    exact: true,
  },
  {
    path: '/product-category/:id/edit',
    loader: () =>
      import('src/view/productCategory/form/ProductCategoryFormPage'),
    permissionRequired: permissions.productCategoryEdit,
    exact: true,
  },
  {
    path: '/product-category/:id',
    loader: () =>
      import('src/view/productCategory/view/ProductCategoryViewPage'),
    permissionRequired: permissions.productCategoryRead,
    exact: true,
  },

  {
    path: '/product',
    loader: () =>
      import('src/view/product/list/ProductListPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },
  {
    path: '/product/new',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productCreate,
    exact: true,
  },
  {
    path: '/product/importer',
    loader: () =>
      import(
        'src/view/product/importer/ProductImporterPage'
      ),
    permissionRequired: permissions.productImport,
    exact: true,
  },
  {
    path: '/product/:id/edit',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productEdit,
    exact: true,
  },
  {
    path: '/product/:id',
    loader: () =>
      import('src/view/product/view/ProductViewPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },

  {
    path: '/product-options',
    loader: () =>
      import('src/view/productOptions/list/ProductOptionsListPage'),
    permissionRequired: permissions.productOptionsRead,
    exact: true,
  },
  {
    path: '/product-options/new',
    loader: () =>
      import('src/view/productOptions/form/ProductOptionsFormPage'),
    permissionRequired: permissions.productOptionsCreate,
    exact: true,
  },
  {
    path: '/product-options/importer',
    loader: () =>
      import(
        'src/view/productOptions/importer/ProductOptionsImporterPage'
      ),
    permissionRequired: permissions.productOptionsImport,
    exact: true,
  },
  {
    path: '/product-options/:id/edit',
    loader: () =>
      import('src/view/productOptions/form/ProductOptionsFormPage'),
    permissionRequired: permissions.productOptionsEdit,
    exact: true,
  },
  {
    path: '/product-options/:id',
    loader: () =>
      import('src/view/productOptions/view/ProductOptionsViewPage'),
    permissionRequired: permissions.productOptionsRead,
    exact: true,
  },

  {
    path: '/payment-link',
    loader: () =>
      import('src/view/paymentLink/list/PaymentLinkListPage'),
    permissionRequired: permissions.paymentLinkRead,
    exact: true,
  },
  {
    path: '/payment-link/new',
    loader: () =>
      import('src/view/paymentLink/form/PaymentLinkFormPage'),
    permissionRequired: permissions.paymentLinkCreate,
    exact: true,
  },
  {
    path: '/payment-link/importer',
    loader: () =>
      import(
        'src/view/paymentLink/importer/PaymentLinkImporterPage'
      ),
    permissionRequired: permissions.paymentLinkImport,
    exact: true,
  },
  {
    path: '/payment-link/:id/edit',
    loader: () =>
      import('src/view/paymentLink/form/PaymentLinkFormPage'),
    permissionRequired: permissions.paymentLinkEdit,
    exact: true,
  },
  {
    path: '/payment-link/:id',
    loader: () =>
      import('src/view/paymentLink/view/PaymentLinkViewPage'),
    permissionRequired: permissions.paymentLinkRead,
    exact: true,
  },

  {
    path: '/invoice',
    loader: () =>
      import('src/view/invoice/list/InvoiceListPage'),
    permissionRequired: permissions.invoiceRead,
    exact: true,
  },
  {
    path: '/invoice/new',
    loader: () =>
      import('src/view/invoice/form/InvoiceFormPage'),
    permissionRequired: permissions.invoiceCreate,
    exact: true,
  },
  {
    path: '/invoice/importer',
    loader: () =>
      import(
        'src/view/invoice/importer/InvoiceImporterPage'
      ),
    permissionRequired: permissions.invoiceImport,
    exact: true,
  },
  {
    path: '/invoice/:id/edit',
    loader: () =>
      import('src/view/invoice/form/InvoiceFormPage'),
    permissionRequired: permissions.invoiceEdit,
    exact: true,
  },
  {
    path: '/invoice/:id',
    loader: () =>
      import('src/view/invoice/view/InvoiceViewPage'),
    permissionRequired: permissions.invoiceRead,
    exact: true,
  },

  {
    path: '/invoice-items',
    loader: () =>
      import('src/view/invoiceItems/list/InvoiceItemsListPage'),
    permissionRequired: permissions.invoiceItemsRead,
    exact: true,
  },
  {
    path: '/invoice-items/new',
    loader: () =>
      import('src/view/invoiceItems/form/InvoiceItemsFormPage'),
    permissionRequired: permissions.invoiceItemsCreate,
    exact: true,
  },
  {
    path: '/invoice-items/importer',
    loader: () =>
      import(
        'src/view/invoiceItems/importer/InvoiceItemsImporterPage'
      ),
    permissionRequired: permissions.invoiceItemsImport,
    exact: true,
  },
  {
    path: '/invoice-items/:id/edit',
    loader: () =>
      import('src/view/invoiceItems/form/InvoiceItemsFormPage'),
    permissionRequired: permissions.invoiceItemsEdit,
    exact: true,
  },
  {
    path: '/invoice-items/:id',
    loader: () =>
      import('src/view/invoiceItems/view/InvoiceItemsViewPage'),
    permissionRequired: permissions.invoiceItemsRead,
    exact: true,
  },

  {
    path: '/banks',
    loader: () =>
      import('src/view/banks/list/BanksListPage'),
    permissionRequired: permissions.banksRead,
    exact: true,
  },
  {
    path: '/banks/new',
    loader: () =>
      import('src/view/banks/form/BanksFormPage'),
    permissionRequired: permissions.banksCreate,
    exact: true,
  },
  {
    path: '/banks/importer',
    loader: () =>
      import(
        'src/view/banks/importer/BanksImporterPage'
      ),
    permissionRequired: permissions.banksImport,
    exact: true,
  },
  {
    path: '/banks/:id/edit',
    loader: () =>
      import('src/view/banks/form/BanksFormPage'),
    permissionRequired: permissions.banksEdit,
    exact: true,
  },
  {
    path: '/banks/:id',
    loader: () =>
      import('src/view/banks/view/BanksViewPage'),
    permissionRequired: permissions.banksRead,
    exact: true,
  },

  {
    path: '/business-accounts',
    loader: () =>
      import('src/view/businessAccounts/list/BusinessAccountsListPage'),
    permissionRequired: permissions.businessAccountsRead,
    exact: true,
  },
  {
    path: '/business-accounts/new',
    loader: () =>
      import('src/view/businessAccounts/form/BusinessAccountsFormPage'),
    permissionRequired: permissions.businessAccountsCreate,
    exact: true,
  },
  {
    path: '/business-accounts/importer',
    loader: () =>
      import(
        'src/view/businessAccounts/importer/BusinessAccountsImporterPage'
      ),
    permissionRequired: permissions.businessAccountsImport,
    exact: true,
  },
  {
    path: '/business-accounts/:id/edit',
    loader: () =>
      import('src/view/businessAccounts/form/BusinessAccountsFormPage'),
    permissionRequired: permissions.businessAccountsEdit,
    exact: true,
  },
  {
    path: '/business-accounts/:id',
    loader: () =>
      import('src/view/businessAccounts/view/BusinessAccountsViewPage'),
    permissionRequired: permissions.businessAccountsRead,
    exact: true,
  },

  {
    path: '/business-documents',
    loader: () =>
      import('src/view/businessDocuments/list/BusinessDocumentsListPage'),
    permissionRequired: permissions.businessDocumentsRead,
    exact: true,
  },
  {
    path: '/business-documents/new',
    loader: () =>
      import('src/view/businessDocuments/form/BusinessDocumentsFormPage'),
    permissionRequired: permissions.businessDocumentsCreate,
    exact: true,
  },
  {
    path: '/business-documents/importer',
    loader: () =>
      import(
        'src/view/businessDocuments/importer/BusinessDocumentsImporterPage'
      ),
    permissionRequired: permissions.businessDocumentsImport,
    exact: true,
  },
  {
    path: '/business-documents/:id/edit',
    loader: () =>
      import('src/view/businessDocuments/form/BusinessDocumentsFormPage'),
    permissionRequired: permissions.businessDocumentsEdit,
    exact: true,
  },
  {
    path: '/business-documents/:id',
    loader: () =>
      import('src/view/businessDocuments/view/BusinessDocumentsViewPage'),
    permissionRequired: permissions.businessDocumentsRead,
    exact: true,
  },

  {
    path: '/currency',
    loader: () =>
      import('src/view/currency/list/CurrencyListPage'),
    permissionRequired: permissions.currencyRead,
    exact: true,
  },
  {
    path: '/currency/new',
    loader: () =>
      import('src/view/currency/form/CurrencyFormPage'),
    permissionRequired: permissions.currencyCreate,
    exact: true,
  },
  {
    path: '/currency/importer',
    loader: () =>
      import(
        'src/view/currency/importer/CurrencyImporterPage'
      ),
    permissionRequired: permissions.currencyImport,
    exact: true,
  },
  {
    path: '/currency/:id/edit',
    loader: () =>
      import('src/view/currency/form/CurrencyFormPage'),
    permissionRequired: permissions.currencyEdit,
    exact: true,
  },
  {
    path: '/currency/:id',
    loader: () =>
      import('src/view/currency/view/CurrencyViewPage'),
    permissionRequired: permissions.currencyRead,
    exact: true,
  },

  {
    path: '/payment',
    loader: () =>
      import('src/view/payment/list/PaymentListPage'),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },
  {
    path: '/payment/new',
    loader: () =>
      import('src/view/payment/form/PaymentFormPage'),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },
  {
    path: '/payment/importer',
    loader: () =>
      import(
        'src/view/payment/importer/PaymentImporterPage'
      ),
    permissionRequired: permissions.paymentImport,
    exact: true,
  },
  {
    path: '/payment/:id/edit',
    loader: () =>
      import('src/view/payment/form/PaymentFormPage'),
    permissionRequired: permissions.paymentEdit,
    exact: true,
  },
  {
    path: '/payment/:id',
    loader: () =>
      import('src/view/payment/view/PaymentViewPage'),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-method',
    loader: () =>
      import('src/view/paymentMethod/list/PaymentMethodListPage'),
    permissionRequired: permissions.paymentMethodRead,
    exact: true,
  },
  {
    path: '/payment-method/new',
    loader: () =>
      import('src/view/paymentMethod/form/PaymentMethodFormPage'),
    permissionRequired: permissions.paymentMethodCreate,
    exact: true,
  },
  {
    path: '/payment-method/importer',
    loader: () =>
      import(
        'src/view/paymentMethod/importer/PaymentMethodImporterPage'
      ),
    permissionRequired: permissions.paymentMethodImport,
    exact: true,
  },
  {
    path: '/payment-method/:id/edit',
    loader: () =>
      import('src/view/paymentMethod/form/PaymentMethodFormPage'),
    permissionRequired: permissions.paymentMethodEdit,
    exact: true,
  },
  {
    path: '/payment-method/:id',
    loader: () =>
      import('src/view/paymentMethod/view/PaymentMethodViewPage'),
    permissionRequired: permissions.paymentMethodRead,
    exact: true,
  },

  {
    path: '/withdraw',
    loader: () =>
      import('src/view/withdraw/list/WithdrawListPage'),
    permissionRequired: permissions.withdrawRead,
    exact: true,
  },
  {
    path: '/withdraw/new',
    loader: () =>
      import('src/view/withdraw/form/WithdrawFormPage'),
    permissionRequired: permissions.withdrawCreate,
    exact: true,
  },
  {
    path: '/withdraw/importer',
    loader: () =>
      import(
        'src/view/withdraw/importer/WithdrawImporterPage'
      ),
    permissionRequired: permissions.withdrawImport,
    exact: true,
  },
  {
    path: '/withdraw/:id/edit',
    loader: () =>
      import('src/view/withdraw/form/WithdrawFormPage'),
    permissionRequired: permissions.withdrawEdit,
    exact: true,
  },
  {
    path: '/withdraw/:id',
    loader: () =>
      import('src/view/withdraw/view/WithdrawViewPage'),
    permissionRequired: permissions.withdrawRead,
    exact: true,
  },
  {
    path: '/category',
    loader: () =>
      import('src/view/category/list/CategoryListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/category/new',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryCreate,
    exact: true,
  },
  {
    path: '/category/importer',
    loader: () =>
      import(
        'src/view/category/importer/CategoryImporterPage'
      ),
    permissionRequired: permissions.categoryImport,
    exact: true,
  },
  {
    path: '/category/:id/edit',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryEdit,
    exact: true,
  },
  {
    path: '/category/:id',
    loader: () =>
      import('src/view/category/view/CategoryViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/locations',
    loader: () =>
      import('src/view/locations/list/LocationsListPage'),
    permissionRequired: permissions.locationsRead,
    exact: true,
  },
  {
    path: '/locations/new',
    loader: () =>
      import('src/view/locations/form/LocationsFormPage'),
    permissionRequired: permissions.locationsCreate,
    exact: true,
  },
  {
    path: '/locations/importer',
    loader: () =>
      import(
        'src/view/locations/importer/LocationsImporterPage'
      ),
    permissionRequired: permissions.locationsImport,
    exact: true,
  },
  {
    path: '/locations/:id/edit',
    loader: () =>
      import('src/view/locations/form/LocationsFormPage'),
    permissionRequired: permissions.locationsEdit,
    exact: true,
  },
  {
    path: '/locations/:id',
    loader: () =>
      import('src/view/locations/view/LocationsViewPage'),
    permissionRequired: permissions.locationsRead,
    exact: true,
  },
  {
    path: '/refund',
    loader: () =>
      import('src/view/refund/list/RefundListPage'),
    permissionRequired: permissions.refundRead,
    exact: true,
  },
  {
    path: '/refund/new',
    loader: () =>
      import('src/view/refund/form/RefundFormPage'),
    permissionRequired: permissions.refundCreate,
    exact: true,
  },
  {
    path: '/refund/importer',
    loader: () =>
      import(
        'src/view/refund/importer/RefundImporterPage'
      ),
    permissionRequired: permissions.refundImport,
    exact: true,
  },
  {
    path: '/refund/:id/edit',
    loader: () =>
      import('src/view/refund/form/RefundFormPage'),
    permissionRequired: permissions.refundEdit,
    exact: true,
  },
  {
    path: '/refund/:id',
    loader: () =>
      import('src/view/refund/view/RefundViewPage'),
    permissionRequired: permissions.refundRead,
    exact: true,
  },

  {
    path: '/transaction',
    loader: () =>
      import('src/view/transaction/list/TransactionListPage'),
    permissionRequired: permissions.transactionRead,
    exact: true,
  },
  {
    path: '/transaction/new',
    loader: () =>
      import('src/view/transaction/form/TransactionFormPage'),
    permissionRequired: permissions.transactionCreate,
    exact: true,
  },
  {
    path: '/transaction/importer',
    loader: () =>
      import(
        'src/view/transaction/importer/TransactionImporterPage'
      ),
    permissionRequired: permissions.transactionImport,
    exact: true,
  },
  {
    path: '/transaction/:id/edit',
    loader: () =>
      import('src/view/transaction/form/TransactionFormPage'),
    permissionRequired: permissions.transactionEdit,
    exact: true,
  },
  {
    path: '/transaction/:id',
    loader: () =>
      import('src/view/transaction/view/TransactionViewPage'),
    permissionRequired: permissions.transactionRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);
const deactiveTenant = [
  {
    path: '/auth/tenant-deactive',
    loader: () =>
      import('src/view/auth/DeactiveTenantPage'),
  },
].filter(Boolean);
const twoFA = [
  {
    path: '/auth/two-factor-authentication',
    loader: () =>
      import('src/view/auth/TwoFAPage'),
  },
].filter(Boolean);

const accountCenterRoutes = [
  {
    path: '/profile',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/password-change',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/account-center',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/new',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/:id/edit',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/admin-area',
    loader: () => import('src/view/admin/AdminPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
  deactiveTenant,
  twoFA,
  accountCenterRoutes
};
