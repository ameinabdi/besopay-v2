import { createRouterReducer } from '@lagunovsky/redux-react-router'
import layout from 'src/modules/layout/layoutReducers';
import settings from 'src/modules/settings/settingsReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import auth from 'src/modules/auth/authReducers';
import payment from 'src/modules/payment/paymentReducers';

import { combineReducers } from 'redux';

export default (history) =>
  combineReducers({
    router: createRouterReducer(history),
    layout,
    settings,
    tenant,
    auth,
    payment
  });
