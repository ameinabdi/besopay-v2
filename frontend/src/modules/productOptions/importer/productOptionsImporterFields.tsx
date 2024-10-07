import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'optionTitle',
    label: i18n('entities.productOptions.fields.optionTitle'),
    schema: schemas.string(
      i18n('entities.productOptions.fields.optionTitle'),
      {},
    ),
  },
  {
    name: 'optionDescription',
    label: i18n('entities.productOptions.fields.optionDescription'),
    schema: schemas.string(
      i18n('entities.productOptions.fields.optionDescription'),
      {},
    ),
  },
  {
    name: 'product',
    label: i18n('entities.productOptions.fields.product'),
    schema: schemas.relationToOne(
      i18n('entities.productOptions.fields.product'),
      {},
    ),
  },
];