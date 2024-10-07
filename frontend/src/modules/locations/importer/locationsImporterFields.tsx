import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import locationsEnumerators from 'src/modules/locations/locationsEnumerators';

export default [
  {
    name: 'city',
    label: i18n('entities.locations.fields.city'),
    schema: schemas.string(
      i18n('entities.locations.fields.city'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'state',
    label: i18n('entities.locations.fields.state'),
    schema: schemas.string(
      i18n('entities.locations.fields.state'),
      {},
    ),
  },
  {
    name: 'country',
    label: i18n('entities.locations.fields.country'),
    schema: schemas.string(
      i18n('entities.locations.fields.country'),
      {},
    ),
  },
  {
    name: 'streetAddress',
    label: i18n('entities.locations.fields.streetAddress'),
    schema: schemas.string(
      i18n('entities.locations.fields.streetAddress'),
      {},
    ),
  },
  {
    name: 'type',
    label: i18n('entities.locations.fields.type'),
    schema: schemas.enumerator(
      i18n('entities.locations.fields.type'),
      {
        "options": locationsEnumerators.type
      },
    ),
  },
];