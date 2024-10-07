import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.accountcenter.fields.id'),
  },
  {
    name: 'twoFA',
    label: i18n('entities.accountcenter.fields.twoFA'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'notification',
    label: i18n('entities.accountcenter.fields.notification'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.accountcenter.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.accountcenter.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
