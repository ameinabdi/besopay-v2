import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import paymentLinkEnumerators from 'src/modules/paymentLink/paymentLinkEnumerators';

export default [
  {
    name: 'paymentLinkName',
    label: i18n('entities.paymentLink.fields.paymentLinkName'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.paymentLinkName'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'currency',
    label: i18n('entities.paymentLink.fields.currency'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.currency'),
      {},
    ),
  },
  {
    name: 'amount',
    label: i18n('entities.paymentLink.fields.amount'),
    schema: schemas.decimal(
      i18n('entities.paymentLink.fields.amount'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.paymentLink.fields.description'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.description'),
      {},
    ),
  },
  {
    name: 'customurl',
    label: i18n('entities.paymentLink.fields.customurl'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.customurl'),
      {},
    ),
  },
  {
    name: 'redirecturl',
    label: i18n('entities.paymentLink.fields.redirecturl'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.redirecturl'),
      {},
    ),
  },
  {
    name: 'typePaymentLink',
    label: i18n('entities.paymentLink.fields.typePaymentLink'),
    schema: schemas.enumerator(
      i18n('entities.paymentLink.fields.typePaymentLink'),
      {
        "options": paymentLinkEnumerators.typePaymentLink
      },
    ),
  },
  {
    name: 'interval',
    label: i18n('entities.paymentLink.fields.interval'),
    schema: schemas.enumerator(
      i18n('entities.paymentLink.fields.interval'),
      {
        "options": paymentLinkEnumerators.interval
      },
    ),
  },
  {
    name: 'numberOfTime',
    label: i18n('entities.paymentLink.fields.numberOfTime'),
    schema: schemas.integer(
      i18n('entities.paymentLink.fields.numberOfTime'),
      {},
    ),
  },
  {
    name: 'donationWebsite',
    label: i18n('entities.paymentLink.fields.donationWebsite'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.donationWebsite'),
      {},
    ),
  },
  {
    name: 'donationTelephone',
    label: i18n('entities.paymentLink.fields.donationTelephone'),
    schema: schemas.string(
      i18n('entities.paymentLink.fields.donationTelephone'),
      {},
    ),
  },
];