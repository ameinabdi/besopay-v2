import list from 'src/modules/payment/list/paymentListReducers';
import form from 'src/modules/payment/form/paymentFormReducers';
import view from 'src/modules/payment/view/paymentViewReducers';
import destroy from 'src/modules/payment/destroy/paymentDestroyReducers';
import importerReducer from 'src/modules/payment/importer/paymentImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
