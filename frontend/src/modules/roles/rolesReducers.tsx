import list from 'src/modules/roles/list/rolesListReducers';
import form from 'src/modules/roles/form/rolesFormReducers';
import view from 'src/modules/roles/view/rolesViewReducers';
import destroy from 'src/modules/roles/destroy/rolesDestroyReducers';
import importerReducer from 'src/modules/roles/importer/rolesImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
