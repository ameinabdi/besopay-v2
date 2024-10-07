import list from 'src/modules/business/list/businessListReducers';
import form from 'src/modules/business/form/businessFormReducers';
import view from 'src/modules/business/view/businessViewReducers';
import destroy from 'src/modules/business/destroy/businessDestroyReducers';
import importerReducer from 'src/modules/business/importer/businessImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
