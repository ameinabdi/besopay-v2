import list from 'src/modules/businessDocuments/list/businessDocumentsListReducers';
import form from 'src/modules/businessDocuments/form/businessDocumentsFormReducers';
import view from 'src/modules/businessDocuments/view/businessDocumentsViewReducers';
import destroy from 'src/modules/businessDocuments/destroy/businessDocumentsDestroyReducers';
import importerReducer from 'src/modules/businessDocuments/importer/businessDocumentsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
