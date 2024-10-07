import list from 'src/modules/locations/list/locationsListReducers';
import form from 'src/modules/locations/form/locationsFormReducers';
import view from 'src/modules/locations/view/locationsViewReducers';
import destroy from 'src/modules/locations/destroy/locationsDestroyReducers';
import importerReducer from 'src/modules/locations/importer/locationsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
