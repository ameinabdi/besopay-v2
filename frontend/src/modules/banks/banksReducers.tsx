import list from 'src/modules/banks/list/banksListReducers';
import form from 'src/modules/banks/form/banksFormReducers';
import view from 'src/modules/banks/view/banksViewReducers';
import destroy from 'src/modules/banks/destroy/banksDestroyReducers';
import importerReducer from 'src/modules/banks/importer/banksImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
