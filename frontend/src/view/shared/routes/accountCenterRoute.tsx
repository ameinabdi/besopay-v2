import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import {  Row, Col } from 'antd';
import Layout from 'src/view/layout/Layout';
import config from 'src/config';
import MiniSideWrapper from 'src/view/layout/styles/MiniSideWrapper';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import { i18n } from 'src/i18n';
import AccountItem from 'src/view/accountCenter/AccountItem';

function AccountCenterRoute({
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
            <Breadcrumb
            items={[
                [i18n('dashboard.menu'), '/'],
                [i18n('accountcenter.menu')],
            ]}
            />
            <Row>
                <Col {...{
                xs: 24,
                sm: 24,
                md: 5,
                lg: 5,
                xl: 5,
                style: {
                marginBottom: 24,
                marginRight:20
                },
            }}>
                <MiniSideWrapper>
                   <AccountItem />
                </MiniSideWrapper>
                </Col>
                <Col {...{
                    xs: 24,
                    sm: 24,
                    md: 18,
                    lg: 18,
                    xl: 18,
                    style: {
                    marginBottom: 24,
                    },
                }}>            
                <Component {...props} />
               </Col>
               </Row>
          </Layout>
        );
}

export default AccountCenterRoute;
