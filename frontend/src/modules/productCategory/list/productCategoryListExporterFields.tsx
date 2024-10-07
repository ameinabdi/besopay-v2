import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.productCategory.fields.id'),
  },
  {
    name: 'category',
    label: i18n('entities.productCategory.fields.category'),
  },
  {
    name: 'description',
    label: i18n('entities.productCategory.fields.description'),
  },
  {
    name: 'store',
    label: i18n('entities.productCategory.fields.store'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.productCategory.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.productCategory.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
