import list from 'src/modules/store/list/storeListReducers';
import form from 'src/modules/store/form/storeFormReducers';
import view from 'src/modules/store/view/storeViewReducers';
import destroy from 'src/modules/store/destroy/storeDestroyReducers';
import importerReducer from 'src/modules/store/importer/storeImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
