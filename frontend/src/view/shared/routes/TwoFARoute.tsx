import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import { Navigate } from 'react-router-dom';

function TwoFARoute({
  component: Component,
  currentTenant,
  currentUser,
  currentPermission,
  ...props
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

  if (permissionChecker.isAnabled2FA) {
    return <Navigate to="/" />;
  }
  return (<Component {...props} />  );
}

export default TwoFARoute;
