import list from 'src/modules/paymentLink/list/paymentLinkListReducers';
import form from 'src/modules/paymentLink/form/paymentLinkFormReducers';
import view from 'src/modules/paymentLink/view/paymentLinkViewReducers';
import destroy from 'src/modules/paymentLink/destroy/paymentLinkDestroyReducers';
import importerReducer from 'src/modules/paymentLink/importer/paymentLinkImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
