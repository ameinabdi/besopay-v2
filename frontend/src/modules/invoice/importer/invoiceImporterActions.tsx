import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/invoice/importer/invoiceImporterSelectors';
import InvoiceService from 'src/modules/invoice/invoiceService';
import fields from 'src/modules/invoice/importer/invoiceImporterFields';
import { i18n } from 'src/i18n';

const invoiceImporterActions = importerActions(
  'INVOICE_IMPORTER',
  selectors,
  InvoiceService.import,
  fields,
  i18n('entities.invoice.importer.fileName'),
);

export default invoiceImporterActions;