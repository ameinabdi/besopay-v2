import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/businessDocuments/importer/businessDocumentsImporterSelectors';
import BusinessDocumentsService from 'src/modules/businessDocuments/businessDocumentsService';
import fields from 'src/modules/businessDocuments/importer/businessDocumentsImporterFields';
import { i18n } from 'src/i18n';

const businessDocumentsImporterActions = importerActions(
  'BUSINESSDOCUMENTS_IMPORTER',
  selectors,
  BusinessDocumentsService.import,
  fields,
  i18n('entities.businessDocuments.importer.fileName'),
);

export default businessDocumentsImporterActions;