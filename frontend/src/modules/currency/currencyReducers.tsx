import list from 'src/modules/currency/list/currencyListReducers';
import form from 'src/modules/currency/form/currencyFormReducers';
import view from 'src/modules/currency/view/currencyViewReducers';
import destroy from 'src/modules/currency/destroy/currencyDestroyReducers';
import importerReducer from 'src/modules/currency/importer/currencyImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
