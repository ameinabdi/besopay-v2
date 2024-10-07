import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import businessDocumentsEnumerators from 'src/modules/businessDocuments/businessDocumentsEnumerators';

export default [
  {
    name: 'type',
    label: i18n('entities.businessDocuments.fields.type'),
    schema: schemas.enumerator(
      i18n('entities.businessDocuments.fields.type'),
      {
        "required": true,
        "options": businessDocumentsEnumerators.type
      },
    ),
  },
  {
    name: 'document',
    label: i18n('entities.businessDocuments.fields.document'),
    schema: schemas.files(
      i18n('entities.businessDocuments.fields.document'),
      {},
    ),
  },
];