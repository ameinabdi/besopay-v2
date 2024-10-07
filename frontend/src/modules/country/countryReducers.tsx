import list from 'src/modules/country/list/countryListReducers';
import form from 'src/modules/country/form/countryFormReducers';
import view from 'src/modules/country/view/countryViewReducers';
import destroy from 'src/modules/country/destroy/countryDestroyReducers';
import importerReducer from 'src/modules/country/importer/countryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
