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
       
      Permissions.values.countryRead,
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
       
      Permissions.values.countryEdit,
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
       
      Permissions.values.countryCreate,
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
       
      Permissions.values.countryImport,
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
       
      Permissions.values.countryDestroy,
    ),
);

const countrySelectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport,
};

export default countrySelectors;
