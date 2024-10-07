import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/country/importer/countryImporterSelectors';
import CountryService from 'src/modules/country/countryService';
import fields from 'src/modules/country/importer/countryImporterFields';
import { i18n } from 'src/i18n';

const countryImporterActions = importerActions(
  'COUNTRY_IMPORTER',
  selectors,
  CountryService.import,
  fields,
  i18n('entities.country.importer.fileName'),
);

export default countryImporterActions;