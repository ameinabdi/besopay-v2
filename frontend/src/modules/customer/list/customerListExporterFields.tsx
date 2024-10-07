import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.customer.fields.id'),
  },
  {
    name: 'fullname',
    label: i18n('entities.customer.fields.fullname'),
  },
  {
    name: 'email',
    label: i18n('entities.customer.fields.email'),
  },
  {
    name: 'telephone',
    label: i18n('entities.customer.fields.telephone'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.customer.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.customer.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
