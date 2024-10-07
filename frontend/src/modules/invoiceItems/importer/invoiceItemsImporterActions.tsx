import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/invoiceItems/importer/invoiceItemsImporterSelectors';
import InvoiceItemsService from 'src/modules/invoiceItems/invoiceItemsService';
import fields from 'src/modules/invoiceItems/importer/invoiceItemsImporterFields';
import { i18n } from 'src/i18n';

const invoiceItemsImporterActions = importerActions(
  'INVOICEITEMS_IMPORTER',
  selectors,
  InvoiceItemsService.import,
  fields,
  i18n('entities.invoiceItems.importer.fileName'),
);

export default invoiceItemsImporterActions;