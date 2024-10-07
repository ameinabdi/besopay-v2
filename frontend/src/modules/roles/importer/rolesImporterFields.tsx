import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'roles',
    label: i18n('entities.roles.fields.roles'),
    schema: schemas.string(
      i18n('entities.roles.fields.roles'),
      {},
    ),
  },
  {
    name: 'description',
    label: i18n('entities.roles.fields.description'),
    schema: schemas.string(
      i18n('entities.roles.fields.description'),
      {},
    ),
  },
  {
    name: 'permissions',
    label: i18n('entities.roles.fields.permissions'),
    schema: schemas.relationToMany(
      i18n('entities.roles.fields.permissions'),
      {},
    ),
  },
  {
    name: 'users',
    label: i18n('entities.roles.fields.users'),
    schema: schemas.relationToMany(
      i18n('entities.roles.fields.users'),
      {},
    ),
  },
  {
    name: 'assignToNewUser',
    label: i18n('entities.roles.fields.assignToNewUser'),
    schema: schemas.boolean(
      i18n('entities.roles.fields.assignToNewUser'),
      {},
    ),
  },
];