import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.locations.fields.id'),
  },
  {
    name: 'city',
    label: i18n('entities.locations.fields.city'),
  },
  {
    name: 'state',
    label: i18n('entities.locations.fields.state'),
  },
  {
    name: 'country',
    label: i18n('entities.locations.fields.country'),
  },
  {
    name: 'streetAddress',
    label: i18n('entities.locations.fields.streetAddress'),
  },
  {
    name: 'type',
    label: i18n('entities.locations.fields.type'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.locations.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.locations.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
