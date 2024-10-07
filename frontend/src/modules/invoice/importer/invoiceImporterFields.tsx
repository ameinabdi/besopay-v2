import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import moment from 'moment';

export default [
  {
    name: 'customer',
    label: i18n('entities.invoice.fields.customer'),
    schema: schemas.relationToMany(
      i18n('entities.invoice.fields.customer'),
      {},
    ),
  },
  {
    name: 'dueDate',
    label: i18n('entities.invoice.fields.dueDate'),
    schema: schemas.date(
      i18n('entities.invoice.fields.dueDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'currency',
    label: i18n('entities.invoice.fields.currency'),
    schema: schemas.string(
      i18n('entities.invoice.fields.currency'),
      {},
    ),
  },
  {
    name: 'invoiceNote',
    label: i18n('entities.invoice.fields.invoiceNote'),
    schema: schemas.string(
      i18n('entities.invoice.fields.invoiceNote'),
      {},
    ),
  },
  {
    name: 'shippingFee',
    label: i18n('entities.invoice.fields.shippingFee'),
    schema: schemas.decimal(
      i18n('entities.invoice.fields.shippingFee'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'discount',
    label: i18n('entities.invoice.fields.discount'),
    schema: schemas.decimal(
      i18n('entities.invoice.fields.discount'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'tax',
    label: i18n('entities.invoice.fields.tax'),
    schema: schemas.decimal(
      i18n('entities.invoice.fields.tax'),
      {
        "scale": 2
      },
    ),
  },
  {
    name: 'otherEmails',
    label: i18n('entities.invoice.fields.otherEmails'),
    schema: schemas.string(
      i18n('entities.invoice.fields.otherEmails'),
      {},
    ),
  },
];