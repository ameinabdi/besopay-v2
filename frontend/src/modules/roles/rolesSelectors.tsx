import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectRolesToRead = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.rolesRead,
    ),
);

const selectRolesToEdit = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.rolesEdit,
    ),
);

const selectRolesToCreate = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.rolesCreate,
    ),
);

const selectRolesToView = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.rolesEdit,
    ),
);

const selectRolesToImport = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.rolesImport,
    ),
);

const selectRolesToDestroy =  createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.rolesDestroy,
    ),
);

const rolesSelectors = {
  selectRolesToRead,
  selectRolesToEdit,
  selectRolesToCreate,
  selectRolesToDestroy,
  selectRolesToImport,
  selectRolesToView,
};

export default rolesSelectors;
