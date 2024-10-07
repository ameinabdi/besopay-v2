import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'bankTypes',
    label: i18n('entities.paymentMethod.fields.bankTypes'),
    schema: schemas.relationToOne(
      i18n('entities.paymentMethod.fields.bankTypes'),
      {},
    ),
  },
  {
    name: 'paymentMethodName',
    label: i18n('entities.paymentMethod.fields.paymentMethodName'),
    schema: schemas.string(
      i18n('entities.paymentMethod.fields.paymentMethodName'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'paymentMethodKey',
    label: i18n('entities.paymentMethod.fields.paymentMethodKey'),
    schema: schemas.string(
      i18n('entities.paymentMethod.fields.paymentMethodKey'),
      {},
    ),
  },
  {
    name: 'paymentMethodDescription',
    label: i18n('entities.paymentMethod.fields.paymentMethodDescription'),
    schema: schemas.string(
      i18n('entities.paymentMethod.fields.paymentMethodDescription'),
      {},
    ),
  },
  {
    name: 'paymentMethodLogo',
    label: i18n('entities.paymentMethod.fields.paymentMethodLogo'),
    schema: schemas.images(
      i18n('entities.paymentMethod.fields.paymentMethodLogo'),
      {},
    ),
  },
  {
    name: 'paymentMethodThumbnail',
    label: i18n('entities.paymentMethod.fields.paymentMethodThumbnail'),
    schema: schemas.images(
      i18n('entities.paymentMethod.fields.paymentMethodThumbnail'),
      {},
    ),
  },
  {
    name: 'paymentMethodActive',
    label: i18n('entities.paymentMethod.fields.paymentMethodActive'),
    schema: schemas.boolean(
      i18n('entities.paymentMethod.fields.paymentMethodActive'),
      {},
    ),
  },
];