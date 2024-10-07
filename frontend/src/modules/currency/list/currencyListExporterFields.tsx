import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.currency.fields.id'),
  },
  {
    name: 'currency',
    label: i18n('entities.currency.fields.currency'),
  },
  {
    name: 'currencyIso',
    label: i18n('entities.currency.fields.currencyIso'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.currency.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.currency.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
