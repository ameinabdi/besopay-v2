import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/locations/importer/locationsImporterSelectors';
import LocationsService from 'src/modules/locations/locationsService';
import fields from 'src/modules/locations/importer/locationsImporterFields';
import { i18n } from 'src/i18n';

const locationsImporterActions = importerActions(
  'LOCATIONS_IMPORTER',
  selectors,
  LocationsService.import,
  fields,
  i18n('entities.locations.importer.fileName'),
);

export default locationsImporterActions;