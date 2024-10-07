import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectTenantToEdit = createSelector(
  [
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentUser, currentPermission) => (tenant) =>
    new PermissionChecker(tenant, currentUser, currentPermission).match(
      Permissions.values.tenantEdit,
    ),
);

const selectTenantToDestroy = createSelector(
  [ 
    authSelectors.selectCurrentUser,
    authSelectors.selectPermissionCurrentUser
  ],
  (currentUser,currentPermission) => (tenant) =>
    new PermissionChecker(tenant, currentUser,currentPermission).match(
      Permissions.values.tenantDestroy,
    ),
);

const selectInvitationToken = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) => (tenant) => {
    if (!currentUser || !currentUser.tenants) {
      return false;
    }

    const tenantUser = currentUser.tenants.find(
      (tenantUser) =>
        tenantUser.tenant.id === tenant.id &&
        tenantUser.status === 'invited',
    );

    if (!tenantUser) {
      return null;
    }

    return tenantUser.invitationToken;
  },
);

const tenantSelectors = {
  selectTenantToEdit,
  selectTenantToDestroy,
  selectInvitationToken,
};

export default tenantSelectors;
