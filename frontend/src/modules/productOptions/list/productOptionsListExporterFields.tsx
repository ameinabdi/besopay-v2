import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.productOptions.fields.id'),
  },
  {
    name: 'optionTitle',
    label: i18n('entities.productOptions.fields.optionTitle'),
  },
  {
    name: 'optionDescription',
    label: i18n('entities.productOptions.fields.optionDescription'),
  },
  {
    name: 'product',
    label: i18n('entities.productOptions.fields.product'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.productOptions.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.productOptions.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
