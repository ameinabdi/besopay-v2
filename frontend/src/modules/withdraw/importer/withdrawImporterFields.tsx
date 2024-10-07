import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import moment from 'moment';

export default [
  {
    name: 'bankAccount',
    label: i18n('entities.withdraw.fields.bankAccount'),
    schema: schemas.relationToOne(
      i18n('entities.withdraw.fields.bankAccount'),
      {},
    ),
  },
  {
    name: 'amount',
    label: i18n('entities.withdraw.fields.amount'),
    schema: schemas.decimal(
      i18n('entities.withdraw.fields.amount'),
      {
        "scale": 4
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.withdraw.fields.description'),
    schema: schemas.string(
      i18n('entities.withdraw.fields.description'),
      {},
    ),
  },
  {
    name: 'paid',
    label: i18n('entities.withdraw.fields.paid'),
    schema: schemas.datetime(
      i18n('entities.withdraw.fields.paid'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD HH:mm') : value,
  },
];