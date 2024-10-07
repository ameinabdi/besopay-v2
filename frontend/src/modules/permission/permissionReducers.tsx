import list from 'src/modules/permission/list/permissionListReducers';
import form from 'src/modules/permission/form/permissionFormReducers';
import view from 'src/modules/permission/view/permissionViewReducers';
import destroy from 'src/modules/permission/destroy/permissionDestroyReducers';
import importerReducer from 'src/modules/permission/importer/permissionImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
