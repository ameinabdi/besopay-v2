import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'fullname',
    label: i18n('entities.business.fields.fullname'),
    schema: schemas.string(
      i18n('entities.business.fields.fullname'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'businessName',
    label: i18n('entities.business.fields.businessName'),
    schema: schemas.string(
      i18n('entities.business.fields.businessName'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'email',
    label: i18n('entities.business.fields.email'),
    schema: schemas.string(
      i18n('entities.business.fields.email'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'country',
    label: i18n('entities.business.fields.country'),
    schema: schemas.string(
      i18n('entities.business.fields.country'),
      {},
    ),
  },
  {
    name: 'password',
    label: i18n('entities.business.fields.password'),
    schema: schemas.string(
      i18n('entities.business.fields.password'),
      {},
    ),
  },
];