import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import { Navigate } from 'react-router-dom';

function DeactiveTenantRoute({
  component: Component,
  currentTenant,
  currentUser,
  currentPermission,
  ...rest
}) {
    const permissionChecker = new PermissionChecker(
      currentTenant,
      currentUser,
      currentPermission
    );

    if (!permissionChecker.isAuthenticated) {
      return (
        <Navigate
          to={{
            pathname: '/auth/signin',
          }}
        />
      );
    }

    if (!permissionChecker.isActiveTenant) {
      return <Navigate to="/" />;
    }

    return <Component {...rest} />;
}

export default DeactiveTenantRoute;
