import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import paymentEnumerators from 'src/modules/payment/paymentEnumerators';

export default [
  {
    name: 'customer',
    label: i18n('entities.payment.fields.customer'),
    schema: schemas.relationToOne(
      i18n('entities.payment.fields.customer'),
      {},
    ),
  },
  {
    name: 'paymentType',
    label: i18n('entities.payment.fields.paymentType'),
    schema: schemas.enumerator(
      i18n('entities.payment.fields.paymentType'),
      {
        "options": paymentEnumerators.paymentType
      },
    ),
  },
  {
    name: 'product',
    label: i18n('entities.payment.fields.product'),
    schema: schemas.relationToOne(
      i18n('entities.payment.fields.product'),
      {},
    ),
  },
  {
    name: 'paymentLink',
    label: i18n('entities.payment.fields.paymentLink'),
    schema: schemas.relationToOne(
      i18n('entities.payment.fields.paymentLink'),
      {},
    ),
  },
  {
    name: 'invoice',
    label: i18n('entities.payment.fields.invoice'),
    schema: schemas.relationToOne(
      i18n('entities.payment.fields.invoice'),
      {},
    ),
  },
  {
    name: 'paymentMethod',
    label: i18n('entities.payment.fields.paymentMethod'),
    schema: schemas.relationToOne(
      i18n('entities.payment.fields.paymentMethod'),
      {},
    ),
  },
  {
    name: 'amount',
    label: i18n('entities.payment.fields.amount'),
    schema: schemas.decimal(
      i18n('entities.payment.fields.amount'),
      {
        "scale": 4
      },
    ),
  },
  {
    name: 'paid',
    label: i18n('entities.payment.fields.paid'),
    schema: schemas.boolean(
      i18n('entities.payment.fields.paid'),
      {},
    ),
  },
  {
    name: 'currency',
    label: i18n('entities.payment.fields.currency'),
    schema: schemas.relationToOne(
      i18n('entities.payment.fields.currency'),
      {},
    ),
  },
];