import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.country.fields.id'),
  },
  {
    name: 'country',
    label: i18n('entities.country.fields.country'),
  },
  {
    name: 'active',
    label: i18n('entities.country.fields.active'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.country.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.country.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
