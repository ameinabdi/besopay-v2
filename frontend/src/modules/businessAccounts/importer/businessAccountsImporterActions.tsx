import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/businessAccounts/importer/businessAccountsImporterSelectors';
import BusinessAccountsService from 'src/modules/businessAccounts/businessAccountsService';
import fields from 'src/modules/businessAccounts/importer/businessAccountsImporterFields';
import { i18n } from 'src/i18n';

const businessAccountsImporterActions = importerActions(
  'BUSINESSACCOUNTS_IMPORTER',
  selectors,
  BusinessAccountsService.import,
  fields,
  i18n('entities.businessAccounts.importer.fileName'),
);

export default businessAccountsImporterActions;