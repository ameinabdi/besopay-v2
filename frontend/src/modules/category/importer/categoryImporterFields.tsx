import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import categoryEnumerators from 'src/modules/category/categoryEnumerators';

export default [
  {
    name: 'categoryName',
    label: i18n('entities.category.fields.categoryName'),
    schema: schemas.string(
      i18n('entities.category.fields.categoryName'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'types',
    label: i18n('entities.category.fields.types'),
    schema: schemas.enumerator(
      i18n('entities.category.fields.types'),
      {
        "options": categoryEnumerators.types
      },
    ),
  },
  {
    name: 'active',
    label: i18n('entities.category.fields.active'),
    schema: schemas.boolean(
      i18n('entities.category.fields.active'),
      {},
    ),
  },
];