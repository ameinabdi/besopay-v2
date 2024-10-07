import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.payment.fields.id'),
  },
  {
    name: 'payment',
    label: i18n('entities.payment.fields.payment'),
  },
  {
    name: 'active',
    label: i18n('entities.payment.fields.active'),
    render: exporterRenders.boolean(),
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
