import list from 'src/modules/invoiceItems/list/invoiceItemsListReducers';
import form from 'src/modules/invoiceItems/form/invoiceItemsFormReducers';
import view from 'src/modules/invoiceItems/view/invoiceItemsViewReducers';
import destroy from 'src/modules/invoiceItems/destroy/invoiceItemsDestroyReducers';
import importerReducer from 'src/modules/invoiceItems/importer/invoiceItemsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
