import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import banksEnumerators from 'src/modules/banks/banksEnumerators';

export default [
  {
    name: 'bankname',
    label: i18n('entities.banks.fields.bankname'),
    schema: schemas.string(
      i18n('entities.banks.fields.bankname'),
      {},
    ),
  },
  {
    name: 'banktelephone',
    label: i18n('entities.banks.fields.banktelephone'),
    schema: schemas.string(
      i18n('entities.banks.fields.banktelephone'),
      {},
    ),
  },
  {
    name: 'bankemail',
    label: i18n('entities.banks.fields.bankemail'),
    schema: schemas.string(
      i18n('entities.banks.fields.bankemail'),
      {},
    ),
  },
  {
    name: 'bankaddress',
    label: i18n('entities.banks.fields.bankaddress'),
    schema: schemas.string(
      i18n('entities.banks.fields.bankaddress'),
      {},
    ),
  },
  {
    name: 'keys',
    label: i18n('entities.banks.fields.keys'),
    schema: schemas.string(
      i18n('entities.banks.fields.keys'),
      {},
    ),
  },
  {
    name: 'bankTypes',
    label: i18n('entities.banks.fields.bankTypes'),
    schema: schemas.enumerator(
      i18n('entities.banks.fields.bankTypes'),
      {
        "required": true,
        "options": banksEnumerators.bankTypes
      },
    ),
  },
];