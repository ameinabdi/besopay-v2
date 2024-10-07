import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.store.fields.id'),
  },
  {
    name: 'storename',
    label: i18n('entities.store.fields.storename'),
  },
  {
    name: 'storedescription',
    label: i18n('entities.store.fields.storedescription'),
  },
  {
    name: 'storeImage',
    label: i18n('entities.store.fields.storeImage'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'storeURL',
    label: i18n('entities.store.fields.storeURL'),
  },
  {
    name: 'storeCategory',
    label: i18n('entities.store.fields.storeCategory'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.store.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.store.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
