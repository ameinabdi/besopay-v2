import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.paymentMethod.fields.id'),
  },
  {
    name: 'bankTypes',
    label: i18n('entities.paymentMethod.fields.bankTypes'),
    render: exporterRenders.relationToOne(),
  },
  {
    name: 'paymentMethodName',
    label: i18n('entities.paymentMethod.fields.paymentMethodName'),
  },
  {
    name: 'paymentMethodKey',
    label: i18n('entities.paymentMethod.fields.paymentMethodKey'),
  },
  {
    name: 'paymentMethodDescription',
    label: i18n('entities.paymentMethod.fields.paymentMethodDescription'),
  },
  {
    name: 'paymentMethodLogo',
    label: i18n('entities.paymentMethod.fields.paymentMethodLogo'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'paymentMethodThumbnail',
    label: i18n('entities.paymentMethod.fields.paymentMethodThumbnail'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'paymentMethodActive',
    label: i18n('entities.paymentMethod.fields.paymentMethodActive'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.paymentMethod.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.paymentMethod.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
