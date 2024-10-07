import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/transaction/importer/transactionImporterSelectors';
import TransactionService from 'src/modules/transaction/transactionService';
import fields from 'src/modules/transaction/importer/transactionImporterFields';
import { i18n } from 'src/i18n';

const transactionImporterActions = importerActions(
  'TRANSACTION_IMPORTER',
  selectors,
  TransactionService.import,
  fields,
  i18n('entities.transaction.importer.fileName'),
);

export default transactionImporterActions;