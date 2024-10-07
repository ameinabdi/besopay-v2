import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.refund.fields.id'),
  },
  {
    name: 'transaction',
    label: i18n('entities.refund.fields.transaction'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'transactionAmound',
    label: i18n('entities.refund.fields.transactionAmound'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'refundType',
    label: i18n('entities.refund.fields.refundType'),
  },
  {
    name: 'customerNote',
    label: i18n('entities.refund.fields.customerNote'),
  },
  {
    name: 'businessNote',
    label: i18n('entities.refund.fields.businessNote'),
  },
  {
    name: 'customer',
    label: i18n('entities.refund.fields.customer'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.refund.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.refund.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
