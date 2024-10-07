import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/shipping/importer/shippingImporterSelectors';
import ShippingService from 'src/modules/shipping/shippingService';
import fields from 'src/modules/shipping/importer/shippingImporterFields';
import { i18n } from 'src/i18n';

const shippingImporterActions = importerActions(
  'SHIPPING_IMPORTER',
  selectors,
  ShippingService.import,
  fields,
  i18n('entities.shipping.importer.fileName'),
);

export default shippingImporterActions;