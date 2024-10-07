import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import storeEnumerators from 'src/modules/store/storeEnumerators';

export default [
  {
    name: 'storename',
    label: i18n('entities.store.fields.storename'),
    schema: schemas.string(
      i18n('entities.store.fields.storename'),
      {},
    ),
  },
  {
    name: 'storedescription',
    label: i18n('entities.store.fields.storedescription'),
    schema: schemas.string(
      i18n('entities.store.fields.storedescription'),
      {},
    ),
  },
  {
    name: 'storeImage',
    label: i18n('entities.store.fields.storeImage'),
    schema: schemas.images(
      i18n('entities.store.fields.storeImage'),
      {},
    ),
  },
  {
    name: 'storeURL',
    label: i18n('entities.store.fields.storeURL'),
    schema: schemas.string(
      i18n('entities.store.fields.storeURL'),
      {},
    ),
  },
  {
    name: 'storeCategory',
    label: i18n('entities.store.fields.storeCategory'),
    schema: schemas.enumerator(
      i18n('entities.store.fields.storeCategory'),
      {
        "options": storeEnumerators.storeCategory
      },
    ),
  },
];