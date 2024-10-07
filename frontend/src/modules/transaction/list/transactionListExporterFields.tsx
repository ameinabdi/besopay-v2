import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.transaction.fields.id'),
  },
  {
    name: 'status',
    label: i18n('entities.transaction.fields.status'),
  },
  {
    name: 'paymentMethod',
    label: i18n('entities.transaction.fields.paymentMethod'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'amount',
    label: i18n('entities.transaction.fields.amount'),
    render: exporterRenders.decimal(3),
  },
  {
    name: 'customer',
    label: i18n('entities.transaction.fields.customer'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'reference',
    label: i18n('entities.transaction.fields.reference'),
  },
  {
    name: 'currency',
    label: i18n('entities.transaction.fields.currency'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'paymentType',
    label: i18n('entities.transaction.fields.paymentType'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.transaction.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.transaction.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
