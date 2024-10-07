import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.businessAccounts.fields.id'),
  },
  {
    name: 'bankType',
    label: i18n('entities.businessAccounts.fields.bankType'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'accountName',
    label: i18n('entities.businessAccounts.fields.accountName'),
  },
  {
    name: 'accountNumber',
    label: i18n('entities.businessAccounts.fields.accountNumber'),
  },
  {
    name: 'telephone',
    label: i18n('entities.businessAccounts.fields.telephone'),
  },
  {
    name: 'currency',
    label: i18n('entities.businessAccounts.fields.currency'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'isPrimary',
    label: i18n('entities.businessAccounts.fields.isPrimary'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.businessAccounts.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.businessAccounts.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
