import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/paymentMethod/importer/paymentMethodImporterSelectors';
import PaymentMethodService from 'src/modules/paymentMethod/paymentMethodService';
import fields from 'src/modules/paymentMethod/importer/paymentMethodImporterFields';
import { i18n } from 'src/i18n';

const paymentMethodImporterActions = importerActions(
  'PAYMENTMETHOD_IMPORTER',
  selectors,
  PaymentMethodService.import,
  fields,
  i18n('entities.paymentMethod.importer.fileName'),
);

export default paymentMethodImporterActions;