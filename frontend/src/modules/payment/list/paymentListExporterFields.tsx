import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.payment.fields.id'),
  },
  {
    name: 'customer',
    label: i18n('entities.payment.fields.customer'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'paymentType',
    label: i18n('entities.payment.fields.paymentType'),
  },
  {
    name: 'product',
    label: i18n('entities.payment.fields.product'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'paymentLink',
    label: i18n('entities.payment.fields.paymentLink'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'invoice',
    label: i18n('entities.payment.fields.invoice'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'paymentMethod',
    label: i18n('entities.payment.fields.paymentMethod'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'amount',
    label: i18n('entities.payment.fields.amount'),
    render: exporterRenders.decimal(4),
  },
  {
    name: 'paid',
    label: i18n('entities.payment.fields.paid'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'currency',
    label: i18n('entities.payment.fields.currency'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.payment.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.payment.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
