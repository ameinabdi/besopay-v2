import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.invoice.fields.id'),
  },
  {
    name: 'customer',
    label: i18n('entities.invoice.fields.customer'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'dueDate',
    label: i18n('entities.invoice.fields.dueDate'),
  },
  {
    name: 'currency',
    label: i18n('entities.invoice.fields.currency'),
  },
  {
    name: 'invoiceNote',
    label: i18n('entities.invoice.fields.invoiceNote'),
  },
  {
    name: 'shippingFee',
    label: i18n('entities.invoice.fields.shippingFee'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'discount',
    label: i18n('entities.invoice.fields.discount'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'tax',
    label: i18n('entities.invoice.fields.tax'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'otherEmails',
    label: i18n('entities.invoice.fields.otherEmails'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.invoice.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.invoice.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
