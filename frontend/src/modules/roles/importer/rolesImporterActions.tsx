import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/roles/importer/rolesImporterSelectors';
import RolesService from 'src/modules/roles/rolesService';
import fields from 'src/modules/roles/importer/rolesImporterFields';
import { i18n } from 'src/i18n';

const rolesImporterActions = importerActions(
  'ROLES_IMPORTER',
  selectors,
  RolesService.import,
  fields,
  i18n('entities.roles.importer.fileName'),
);

export default rolesImporterActions;