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
      Permissions.values.paymentMethodRead,
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
      Permissions.values.paymentMethodEdit,
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
      Permissions.values.paymentMethodCreate,
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
      Permissions.values.paymentMethodImport,
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
      Permissions.values.paymentMethodDestroy,
    ),
);

const paymentMethodSelectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport,
};

export default paymentMethodSelectors;
