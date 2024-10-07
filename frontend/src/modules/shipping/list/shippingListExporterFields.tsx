import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.shipping.fields.id'),
  },
  {
    name: 'region',
    label: i18n('entities.shipping.fields.region'),
  },
  {
    name: 'currency',
    label: i18n('entities.shipping.fields.currency'),
  },
  {
    name: 'price',
    label: i18n('entities.shipping.fields.price'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'store',
    label: i18n('entities.shipping.fields.store'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.shipping.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.shipping.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
