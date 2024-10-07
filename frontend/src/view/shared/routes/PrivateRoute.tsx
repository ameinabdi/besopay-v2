import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import Layout from 'src/view/layout/Layout';
import config from 'src/config';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';


function PrivateRoute({
  component: Component,
  currentTenant,
  currentUser,
  permissionRequired,
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
          to={'/auth/signin'}
        />
      );
    }

    if (!permissionChecker.isEmailVerified) {
      return <Navigate to="/auth/email-unverified" />;
    }
    if (!permissionChecker.isAnabled2FA) {
      return <Navigate to="/auth/two-factor-authentication" />;
    }

    if (
      ['multi', 'multi-with-subdomain'].includes(
        config.tenantMode,
      ) &&
      !tenantSubdomain.isSubdomain
    ) {
      if (permissionChecker.isEmptyTenant) {
        return <Navigate to="/auth/tenant" />;
      }
      // if (permissionChecker.isActiveTenant) {
      //   return <Navigate to="/auth/tenant-deactive" />;
      // }
    } else {
      if (permissionChecker.isEmptyPermissions) {
        return (
          <Navigate to="/auth/empty-permissions" />
        );
      }
    }

    if (!permissionChecker.match(permissionRequired)) {
      return <Navigate to="/403" />;
    }

    return (
      <Layout {...props}>
           <Component {...props} />
     </Layout>
    );
  
}

export default PrivateRoute;
