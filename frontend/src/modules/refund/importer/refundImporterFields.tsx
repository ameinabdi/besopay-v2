import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import refundEnumerators from 'src/modules/refund/refundEnumerators';

export default [
  {
    name: 'transaction',
    label: i18n('entities.refund.fields.transaction'),
    schema: schemas.relationToOne(
      i18n('entities.refund.fields.transaction'),
      {},
    ),
  },
  {
    name: 'transactionAmound',
    label: i18n('entities.refund.fields.transactionAmound'),
    schema: schemas.decimal(
      i18n('entities.refund.fields.transactionAmound'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'refundType',
    label: i18n('entities.refund.fields.refundType'),
    schema: schemas.enumerator(
      i18n('entities.refund.fields.refundType'),
      {
        "options": refundEnumerators.refundType
      },
    ),
  },
  {
    name: 'customerNote',
    label: i18n('entities.refund.fields.customerNote'),
    schema: schemas.string(
      i18n('entities.refund.fields.customerNote'),
      {},
    ),
  },
  {
    name: 'businessNote',
    label: i18n('entities.refund.fields.businessNote'),
    schema: schemas.string(
      i18n('entities.refund.fields.businessNote'),
      {},
    ),
  },
  {
    name: 'customer',
    label: i18n('entities.refund.fields.customer'),
    schema: schemas.relationToOne(
      i18n('entities.refund.fields.customer'),
      {},
    ),
  },
];