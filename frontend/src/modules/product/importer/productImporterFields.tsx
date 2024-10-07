import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'productName',
    label: i18n('entities.product.fields.productName'),
    schema: schemas.string(
      i18n('entities.product.fields.productName'),
      {},
    ),
  },
  {
    name: 'productDescription',
    label: i18n('entities.product.fields.productDescription'),
    schema: schemas.string(
      i18n('entities.product.fields.productDescription'),
      {},
    ),
  },
  {
    name: 'price',
    label: i18n('entities.product.fields.price'),
    schema: schemas.decimal(
      i18n('entities.product.fields.price'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'sellingPrice',
    label: i18n('entities.product.fields.sellingPrice'),
    schema: schemas.decimal(
      i18n('entities.product.fields.sellingPrice'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'stockUnit',
    label: i18n('entities.product.fields.stockUnit'),
    schema: schemas.integer(
      i18n('entities.product.fields.stockUnit'),
      {},
    ),
  },
  {
    name: 'category',
    label: i18n('entities.product.fields.category'),
    schema: schemas.relationToOne(
      i18n('entities.product.fields.category'),
      {},
    ),
  },
  {
    name: 'productImages',
    label: i18n('entities.product.fields.productImages'),
    schema: schemas.images(
      i18n('entities.product.fields.productImages'),
      {
        "max": 5
      },
    ),
  },
];