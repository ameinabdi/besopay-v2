import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.paymentLink.fields.id'),
  },
  {
    name: 'paymentLinkName',
    label: i18n('entities.paymentLink.fields.paymentLinkName'),
  },
  {
    name: 'currency',
    label: i18n('entities.paymentLink.fields.currency'),
  },
  {
    name: 'amount',
    label: i18n('entities.paymentLink.fields.amount'),
    render: exporterRenders.decimal(2),
  },
  {
    name: 'description',
    label: i18n('entities.paymentLink.fields.description'),
  },
  {
    name: 'customurl',
    label: i18n('entities.paymentLink.fields.customurl'),
  },
  {
    name: 'redirecturl',
    label: i18n('entities.paymentLink.fields.redirecturl'),
  },
  {
    name: 'typePaymentLink',
    label: i18n('entities.paymentLink.fields.typePaymentLink'),
  },
  {
    name: 'interval',
    label: i18n('entities.paymentLink.fields.interval'),
  },
  {
    name: 'numberOfTime',
    label: i18n('entities.paymentLink.fields.numberOfTime'),
  },
  {
    name: 'donationWebsite',
    label: i18n('entities.paymentLink.fields.donationWebsite'),
  },
  {
    name: 'donationTelephone',
    label: i18n('entities.paymentLink.fields.donationTelephone'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.paymentLink.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.paymentLink.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
