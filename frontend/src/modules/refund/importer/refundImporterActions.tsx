import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/refund/importer/refundImporterSelectors';
import RefundService from 'src/modules/refund/refundService';
import fields from 'src/modules/refund/importer/refundImporterFields';
import { i18n } from 'src/i18n';

const refundImporterActions = importerActions(
  'REFUND_IMPORTER',
  selectors,
  RefundService.import,
  fields,
  i18n('entities.refund.importer.fileName'),
);

export default refundImporterActions;