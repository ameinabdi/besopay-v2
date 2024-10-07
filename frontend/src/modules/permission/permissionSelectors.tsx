import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectPermissionToRead = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.permissionRead,
    ),
);

const selectPermissionToEdit = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.permissionEdit,
    ),
);

const selectPermissionToCreate = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.permissionCreate,
    ),
);

const selectPermissionToImport = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.permissionImport,
    ),
);

const selectPermissionToDestroy = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentTenant, currentUser, currentPermission) =>
    new PermissionChecker(currentTenant, currentUser, currentPermission).match(
      Permissions.values.permissionDestroy,
    ),
);

const permissionSelectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport,
};

export default permissionSelectors;
