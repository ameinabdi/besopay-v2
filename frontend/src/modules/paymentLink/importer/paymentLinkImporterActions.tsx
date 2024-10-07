import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/paymentLink/importer/paymentLinkImporterSelectors';
import PaymentLinkService from 'src/modules/paymentLink/paymentLinkService';
import fields from 'src/modules/paymentLink/importer/paymentLinkImporterFields';
import { i18n } from 'src/i18n';

const paymentLinkImporterActions = importerActions(
  'PAYMENTLINK_IMPORTER',
  selectors,
  PaymentLinkService.import,
  fields,
  i18n('entities.paymentLink.importer.fileName'),
);

export default paymentLinkImporterActions;