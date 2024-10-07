import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/permission/importer/permissionImporterSelectors';
import PermissionService from 'src/modules/permission/permissionService';
import fields from 'src/modules/permission/importer/permissionImporterFields';
import { i18n } from 'src/i18n';

const permissionImporterActions = importerActions(
  'PERMISSION_IMPORTER',
  selectors,
  PermissionService.import,
  fields,
  i18n('entities.permission.importer.fileName'),
);

export default permissionImporterActions;