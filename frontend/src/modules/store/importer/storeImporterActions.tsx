import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/store/importer/storeImporterSelectors';
import StoreService from 'src/modules/store/storeService';
import fields from 'src/modules/store/importer/storeImporterFields';
import { i18n } from 'src/i18n';

const storeImporterActions = importerActions(
  'STORE_IMPORTER',
  selectors,
  StoreService.import,
  fields,
  i18n('entities.store.importer.fileName'),
);

export default storeImporterActions;