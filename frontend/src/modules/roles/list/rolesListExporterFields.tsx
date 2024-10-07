import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.roles.fields.id'),
  },
  {
    name: 'roles',
    label: i18n('entities.roles.fields.roles'),
  },
  {
    name: 'description',
    label: i18n('entities.roles.fields.description'),
  },
  {
    name: 'permissions',
    label: i18n('entities.roles.fields.permissions'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'users',
    label: i18n('entities.roles.fields.users'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'assignToNewUser',
    label: i18n('entities.roles.fields.assignToNewUser'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.roles.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.roles.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
