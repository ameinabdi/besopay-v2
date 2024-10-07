import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/business/importer/businessImporterSelectors';
import BusinessService from 'src/modules/business/businessService';
import fields from 'src/modules/business/importer/businessImporterFields';
import { i18n } from 'src/i18n';

const businessImporterActions = importerActions(
  'BUSINESS_IMPORTER',
  selectors,
  BusinessService.import,
  fields,
  i18n('entities.business.importer.fileName'),
);

export default businessImporterActions;