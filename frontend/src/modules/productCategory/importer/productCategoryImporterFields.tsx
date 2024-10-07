import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'category',
    label: i18n('entities.productCategory.fields.category'),
    schema: schemas.string(
      i18n('entities.productCategory.fields.category'),
      {},
    ),
  },
  {
    name: 'description',
    label: i18n('entities.productCategory.fields.description'),
    schema: schemas.string(
      i18n('entities.productCategory.fields.description'),
      {},
    ),
  },
  {
    name: 'store',
    label: i18n('entities.productCategory.fields.store'),
    schema: schemas.relationToOne(
      i18n('entities.productCategory.fields.store'),
      {},
    ),
  },
];