import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'currency',
    label: i18n('entities.currency.fields.currency'),
    schema: schemas.string(
      i18n('entities.currency.fields.currency'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'currencyIso',
    label: i18n('entities.currency.fields.currencyIso'),
    schema: schemas.string(
      i18n('entities.currency.fields.currencyIso'),
      {},
    ),
  },
];