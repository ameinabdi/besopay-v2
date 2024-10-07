import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';

export default [
  {
    name: 'status',
    label: i18n('entities.transaction.fields.status'),
    schema: schemas.enumerator(
      i18n('entities.transaction.fields.status'),
      {
        "options": transactionEnumerators.status
      },
    ),
  },
  {
    name: 'paymentMethod',
    label: i18n('entities.transaction.fields.paymentMethod'),
    schema: schemas.relationToOne(
      i18n('entities.transaction.fields.paymentMethod'),
      {},
    ),
  },
  {
    name: 'amount',
    label: i18n('entities.transaction.fields.amount'),
    schema: schemas.decimal(
      i18n('entities.transaction.fields.amount'),
      {
        "scale": 3
      },
    ),
  },
  {
    name: 'customer',
    label: i18n('entities.transaction.fields.customer'),
    schema: schemas.relationToOne(
      i18n('entities.transaction.fields.customer'),
      {},
    ),
  },
  {
    name: 'reference',
    label: i18n('entities.transaction.fields.reference'),
    schema: schemas.string(
      i18n('entities.transaction.fields.reference'),
      {},
    ),
  },
  {
    name: 'currency',
    label: i18n('entities.transaction.fields.currency'),
    schema: schemas.relationToOne(
      i18n('entities.transaction.fields.currency'),
      {},
    ),
  },
  {
    name: 'paymentType',
    label: i18n('entities.transaction.fields.paymentType'),
    schema: schemas.enumerator(
      i18n('entities.transaction.fields.paymentType'),
      {
        "options": transactionEnumerators.paymentType
      },
    ),
  },
];