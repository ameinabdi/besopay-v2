import list from 'src/modules/businessAccounts/list/businessAccountsListReducers';
import form from 'src/modules/businessAccounts/form/businessAccountsFormReducers';
import view from 'src/modules/businessAccounts/view/businessAccountsViewReducers';
import destroy from 'src/modules/businessAccounts/destroy/businessAccountsDestroyReducers';
import importerReducer from 'src/modules/businessAccounts/importer/businessAccountsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
