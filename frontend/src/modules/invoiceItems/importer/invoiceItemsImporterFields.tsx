import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'invoice',
    label: i18n('entities.invoiceItems.fields.invoice'),
    schema: schemas.relationToOne(
      i18n('entities.invoiceItems.fields.invoice'),
      {},
    ),
  },
  {
    name: 'item',
    label: i18n('entities.invoiceItems.fields.item'),
    schema: schemas.string(
      i18n('entities.invoiceItems.fields.item'),
      {},
    ),
  },
  {
    name: 'quantity',
    label: i18n('entities.invoiceItems.fields.quantity'),
    schema: schemas.integer(
      i18n('entities.invoiceItems.fields.quantity'),
      {},
    ),
  },
  {
    name: 'unitPrice',
    label: i18n('entities.invoiceItems.fields.unitPrice'),
    schema: schemas.decimal(
      i18n('entities.invoiceItems.fields.unitPrice'),
      {},
    ),
  },
  {
    name: 'totalAmount',
    label: i18n('entities.invoiceItems.fields.totalAmount'),
    schema: schemas.decimal(
      i18n('entities.invoiceItems.fields.totalAmount'),
      {},
    ),
  },
];