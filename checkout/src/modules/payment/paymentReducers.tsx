import list from 'src/modules/payment/list/paymentListReducers';
import form from 'src/modules/payment/form/paymentFormReducers';
import view from 'src/modules/payment/view/paymentViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
