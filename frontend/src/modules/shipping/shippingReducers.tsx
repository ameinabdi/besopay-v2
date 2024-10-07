import list from 'src/modules/shipping/list/shippingListReducers';
import form from 'src/modules/shipping/form/shippingFormReducers';
import view from 'src/modules/shipping/view/shippingViewReducers';
import destroy from 'src/modules/shipping/destroy/shippingDestroyReducers';
import importerReducer from 'src/modules/shipping/importer/shippingImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
