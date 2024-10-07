import list from 'src/modules/productOptions/list/productOptionsListReducers';
import form from 'src/modules/productOptions/form/productOptionsFormReducers';
import view from 'src/modules/productOptions/view/productOptionsViewReducers';
import destroy from 'src/modules/productOptions/destroy/productOptionsDestroyReducers';
import importerReducer from 'src/modules/productOptions/importer/productOptionsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
