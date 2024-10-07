import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'country',
    label: i18n('entities.country.fields.country'),
    schema: schemas.string(
      i18n('entities.country.fields.country'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'active',
    label: i18n('entities.country.fields.active'),
    schema: schemas.boolean(
      i18n('entities.country.fields.active'),
      {},
    ),
  },
];