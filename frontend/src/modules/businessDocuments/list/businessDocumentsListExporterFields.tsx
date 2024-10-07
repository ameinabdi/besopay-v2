import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.businessDocuments.fields.id'),
  },
  {
    name: 'type',
    label: i18n('entities.businessDocuments.fields.type'),
  },
  {
    name: 'document',
    label: i18n('entities.businessDocuments.fields.document'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.businessDocuments.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.businessDocuments.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
