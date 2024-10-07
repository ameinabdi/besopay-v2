import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'fullname',
    label: i18n('entities.customer.fields.fullname'),
    schema: schemas.string(
      i18n('entities.customer.fields.fullname'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'email',
    label: i18n('entities.customer.fields.email'),
    schema: schemas.string(
      i18n('entities.customer.fields.email'),
      {},
    ),
  },
  {
    name: 'telephone',
    label: i18n('entities.customer.fields.telephone'),
    schema: schemas.string(
      i18n('entities.customer.fields.telephone'),
      {
        "required": true
      },
    ),
  },
];