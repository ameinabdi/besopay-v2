import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.permission.fields.name'),
    schema: schemas.string(
      i18n('entities.permission.fields.name'),
      {},
    ),
  },
  {
    name: 'description',
    label: i18n('entities.permission.fields.description'),
    schema: schemas.string(
      i18n('entities.permission.fields.description'),
      {},
    ),
  },
  {
    name: 'inRoles',
    label: i18n('entities.permission.fields.inRoles'),
    schema: schemas.relationToMany(
      i18n('entities.permission.fields.inRoles'),
      {},
    ),
  },
];