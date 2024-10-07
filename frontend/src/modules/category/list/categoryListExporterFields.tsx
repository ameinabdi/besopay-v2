import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.category.fields.id'),
  },
  {
    name: 'categoryName',
    label: i18n('entities.category.fields.categoryName'),
  },
  {
    name: 'types',
    label: i18n('entities.category.fields.types'),
  },
  {
    name: 'active',
    label: i18n('entities.category.fields.active'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.category.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.category.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
