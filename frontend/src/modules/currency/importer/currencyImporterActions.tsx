import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/currency/importer/currencyImporterSelectors';
import CurrencyService from 'src/modules/currency/currencyService';
import fields from 'src/modules/currency/importer/currencyImporterFields';
import { i18n } from 'src/i18n';

const currencyImporterActions = importerActions(
  'CURRENCY_IMPORTER',
  selectors,
  CurrencyService.import,
  fields,
  i18n('entities.currency.importer.fileName'),
);

export default currencyImporterActions;