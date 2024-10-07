import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import accountcenterEnumerators from 'src/modules/accountcenter/accountcenterEnumerators';

export default [
  {
    name: 'twoFA',
    label: i18n('entities.accountcenter.fields.twoFA'),
    schema: schemas.boolean(
      i18n('entities.accountcenter.fields.twoFA'),
      {},
    ),
  },
  {
    name: 'notification',
    label: i18n('entities.accountcenter.fields.notification'),
    schema: schemas.enumerator(
      i18n('entities.accountcenter.fields.notification'),
      {
        "options": accountcenterEnumerators.notification
      },
    ),
  },
];