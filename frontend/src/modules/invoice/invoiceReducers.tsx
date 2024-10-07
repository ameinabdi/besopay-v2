import list from 'src/modules/invoice/list/invoiceListReducers';
import form from 'src/modules/invoice/form/invoiceFormReducers';
import view from 'src/modules/invoice/view/invoiceViewReducers';
import destroy from 'src/modules/invoice/destroy/invoiceDestroyReducers';
import importerReducer from 'src/modules/invoice/importer/invoiceImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
