import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.business.fields.id'),
  },
  {
    name: 'fullname',
    label: i18n('entities.business.fields.fullname'),
  },
  {
    name: 'businessName',
    label: i18n('entities.business.fields.businessName'),
  },
  {
    name: 'email',
    label: i18n('entities.business.fields.email'),
  },
  {
    name: 'country',
    label: i18n('entities.business.fields.country'),
  },
  {
    name: 'password',
    label: i18n('entities.business.fields.password'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.business.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.business.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
