import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.product.fields.id'),
  },
  {
    name: 'productName',
    label: i18n('entities.product.fields.productName'),
  },
  {
    name: 'productDescription',
    label: i18n('entities.product.fields.productDescription'),
  },
  {
    name: 'price',
    label: i18n('entities.product.fields.price'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'sellingPrice',
    label: i18n('entities.product.fields.sellingPrice'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'stockUnit',
    label: i18n('entities.product.fields.stockUnit'),
  },
  {
    name: 'category',
    label: i18n('entities.product.fields.category'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'productImages',
    label: i18n('entities.product.fields.productImages'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.product.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.product.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
