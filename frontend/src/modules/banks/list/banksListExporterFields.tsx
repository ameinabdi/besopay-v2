import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.banks.fields.id'),
  },
  {
    name: 'bankname',
    label: i18n('entities.banks.fields.bankname'),
  },
  {
    name: 'banktelephone',
    label: i18n('entities.banks.fields.banktelephone'),
  },
  {
    name: 'bankemail',
    label: i18n('entities.banks.fields.bankemail'),
  },
  {
    name: 'bankaddress',
    label: i18n('entities.banks.fields.bankaddress'),
  },
  {
    name: 'keys',
    label: i18n('entities.banks.fields.keys'),
  },
  {
    name: 'bankTypes',
    label: i18n('entities.banks.fields.bankTypes'),
  },
  {
    name: 'createdAt',
    label: i18n('entities.banks.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.banks.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
