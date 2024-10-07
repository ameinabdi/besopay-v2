import list from 'src/modules/refund/list/refundListReducers';
import form from 'src/modules/refund/form/refundFormReducers';
import view from 'src/modules/refund/view/refundViewReducers';
import destroy from 'src/modules/refund/destroy/refundDestroyReducers';
import importerReducer from 'src/modules/refund/importer/refundImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
