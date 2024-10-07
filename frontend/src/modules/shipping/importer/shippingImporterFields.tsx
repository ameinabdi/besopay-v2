import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'region',
    label: i18n('entities.shipping.fields.region'),
    schema: schemas.string(
      i18n('entities.shipping.fields.region'),
      {},
    ),
  },
  {
    name: 'currency',
    label: i18n('entities.shipping.fields.currency'),
    schema: schemas.string(
      i18n('entities.shipping.fields.currency'),
      {},
    ),
  },
  {
    name: 'price',
    label: i18n('entities.shipping.fields.price'),
    schema: schemas.decimal(
      i18n('entities.shipping.fields.price'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'store',
    label: i18n('entities.shipping.fields.store'),
    schema: schemas.relationToOne(
      i18n('entities.shipping.fields.store'),
      {},
    ),
  },
];