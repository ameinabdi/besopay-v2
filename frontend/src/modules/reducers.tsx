import { createRouterReducer } from '@lagunovsky/redux-react-router'
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import user from 'src/modules/user/userReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import settings from 'src/modules/settings/settingsReducers';
import roles from 'src/modules/roles/rolesReducers';
import permission from 'src/modules/permission/permissionReducers';
import accountcenter from 'src/modules/accountcenter/accountcenterReducers';
import country from 'src/modules/country/countryReducers';

import business from 'src/modules/business/businessReducers';
import customer from 'src/modules/customer/customerReducers';
import store from 'src/modules/store/storeReducers';
import shipping from 'src/modules/shipping/shippingReducers';
import productCategory from 'src/modules/productCategory/productCategoryReducers';
import product from 'src/modules/product/productReducers';
import productOptions from 'src/modules/productOptions/productOptionsReducers';
import paymentLink from 'src/modules/paymentLink/paymentLinkReducers';
import invoice from 'src/modules/invoice/invoiceReducers';
import invoiceItems from 'src/modules/invoiceItems/invoiceItemsReducers';
import banks from 'src/modules/banks/banksReducers';
import businessAccounts from 'src/modules/businessAccounts/businessAccountsReducers';
import businessDocuments from 'src/modules/businessDocuments/businessDocumentsReducers';
import currency from 'src/modules/currency/currencyReducers';
import payment from 'src/modules/payment/paymentReducers';
import paymentMethod from 'src/modules/paymentMethod/paymentMethodReducers';
import withdraw from 'src/modules/withdraw/withdrawReducers';
import pay from 'src/modules/pay/payReducers';
import locations from 'src/modules/locations/locationsReducers';
import category from 'src/modules/category/categoryReducers';
import refund from 'src/modules/refund/refundReducers';
import transaction from 'src/modules/transaction/transactionReducers';


import { combineReducers } from 'redux';
import plan from 'src/modules/plan/planReducers';

export default (history) =>
  combineReducers({
    router: createRouterReducer(history),
    layout,
    auth,
    tenant,
    plan,
    user,
    auditLog,
    settings,
    permission,
    roles,
    accountcenter,
    country,
    business,
    customer,
    store,
    shipping,
    productCategory,
    product,
    productOptions,
    paymentLink,
    invoice,
    invoiceItems,
    banks,
    businessAccounts,
    businessDocuments,
    currency,
    payment,
    paymentMethod,
    withdraw,
    pay,
    locations,
    category,
    refund,
    transaction
  });
