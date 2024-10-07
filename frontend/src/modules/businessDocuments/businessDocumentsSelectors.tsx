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
      Permissions.values.businessDocumentsRead,
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
      Permissions.values.businessDocumentsEdit,
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
      Permissions.values.businessDocumentsCreate,
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
      Permissions.values.businessDocumentsImport,
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
      Permissions.values.businessDocumentsDestroy,
    ),
);

const businessDocumentsSelectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport,
};

export default businessDocumentsSelectors;
