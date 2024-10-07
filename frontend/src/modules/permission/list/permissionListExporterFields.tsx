import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.permission.fields.id'),
  },
  {
    name: 'name',
    label: i18n('entities.permission.fields.name'),
  },
  {
    name: 'description',
    label: i18n('entities.permission.fields.description'),
  },
  {
    name: 'inRoles',
    label: i18n('entities.permission.fields.inRoles'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.permission.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.permission.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
