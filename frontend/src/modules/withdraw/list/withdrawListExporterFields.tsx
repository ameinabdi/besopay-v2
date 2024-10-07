import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.withdraw.fields.id'),
  },
  {
    name: 'bankAccount',
    label: i18n('entities.withdraw.fields.bankAccount'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'amount',
    label: i18n('entities.withdraw.fields.amount'),
    render: exporterRenders.decimal(4),
  },
  {
    name: 'description',
    label: i18n('entities.withdraw.fields.description'),
  },
  {
    name: 'paid',
    label: i18n('entities.withdraw.fields.paid'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.withdraw.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.withdraw.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
