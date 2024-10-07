import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.invoiceItems.fields.id'),
  },
  {
    name: 'invoice',
    label: i18n('entities.invoiceItems.fields.invoice'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'item',
    label: i18n('entities.invoiceItems.fields.item'),
  },
  {
    name: 'quantity',
    label: i18n('entities.invoiceItems.fields.quantity'),
  },
  {
    name: 'unitPrice',
    label: i18n('entities.invoiceItems.fields.unitPrice'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'totalAmount',
    label: i18n('entities.invoiceItems.fields.totalAmount'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.invoiceItems.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.invoiceItems.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
