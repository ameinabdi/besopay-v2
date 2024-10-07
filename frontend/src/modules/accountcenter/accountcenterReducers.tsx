import list from 'src/modules/accountcenter/list/accountcenterListReducers';
import form from 'src/modules/accountcenter/form/accountcenterFormReducers';
import view from 'src/modules/accountcenter/view/accountcenterViewReducers';
import destroy from 'src/modules/accountcenter/destroy/accountcenterDestroyReducers';
import importerReducer from 'src/modules/accountcenter/importer/accountcenterImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
