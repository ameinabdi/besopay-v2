import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/payment/importer/paymentImporterSelectors';
import PaymentService from 'src/modules/payment/paymentService';
import fields from 'src/modules/payment/importer/paymentImporterFields';
import { i18n } from 'src/i18n';

const paymentImporterActions = importerActions(
  'PAYMENT_IMPORTER',
  selectors,
  PaymentService.import,
  fields,
  i18n('entities.payment.importer.fileName'),
);

export default paymentImporterActions;