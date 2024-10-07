import list from 'src/modules/pay/list/payListReducers';
import form from 'src/modules/pay/form/payFormReducers';
import view from 'src/modules/pay/view/payViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
