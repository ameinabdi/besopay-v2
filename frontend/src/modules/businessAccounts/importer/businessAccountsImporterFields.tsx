import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'bankType',
    label: i18n('entities.businessAccounts.fields.bankType'),
    schema: schemas.relationToOne(
      i18n('entities.businessAccounts.fields.bankType'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'accountName',
    label: i18n('entities.businessAccounts.fields.accountName'),
    schema: schemas.string(
      i18n('entities.businessAccounts.fields.accountName'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'accountNumber',
    label: i18n('entities.businessAccounts.fields.accountNumber'),
    schema: schemas.string(
      i18n('entities.businessAccounts.fields.accountNumber'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'telephone',
    label: i18n('entities.businessAccounts.fields.telephone'),
    schema: schemas.string(
      i18n('entities.businessAccounts.fields.telephone'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'currency',
    label: i18n('entities.businessAccounts.fields.currency'),
    schema: schemas.relationToOne(
      i18n('entities.businessAccounts.fields.currency'),
      {},
    ),
  },
  {
    name: 'isPrimary',
    label: i18n('entities.businessAccounts.fields.isPrimary'),
    schema: schemas.boolean(
      i18n('entities.businessAccounts.fields.isPrimary'),
      {},
    ),
  },
];