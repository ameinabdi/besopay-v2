import authSelectors from 'src/modules/auth/authSelectors';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import EmailUnverifiedRoute from 'src/view/shared/routes/EmailUnverifiedRoute';
import PrivateRoute from 'src/view/shared/routes/PrivateRoute';
import AccountCenterRoute from 'src/view/shared/routes/accountCenterRoute';
import PublicRoute from 'src/view/shared/routes/PublicRoute';
import CustomLoadable from 'src/view/shared/CustomLoadable';
import ProgressBar from 'src/view/shared/ProgressBar';
import routes from 'src/view/routes';
import EmptyTenantRoute from 'src/view/shared/routes/EmptyTenantRoute';
import EmptyPermissionsRoute from 'src/view/shared/routes/EmptyPermissionsRoute';
import TwoFARoute from './TwoFARoute';
import DeactiveTenantRoute from './DeactiveTenantRoute';

function RoutesComponent(props) {
  const isInitialMount = useRef(true);

  const authLoading = useSelector(
    authSelectors.selectLoadingInit,
  );
  const layoutLoading = useSelector(
    layoutSelectors.selectLoading,
  );
  const loading = authLoading || layoutLoading;
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentPermission = useSelector(
    authSelectors.selectPermissionCurrentUser,
  );


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      ProgressBar.start();
      return;
    }

    if (!loading) {
      ProgressBar.done();
    }
  }, [loading]);

  if (loading) {
    return <div />;
  }

  return (
    <Routes>
    {routes.publicRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<PublicRoute
        key={route.path}
        exact
        path={route.path}
        currentUser={currentUser}
        currentTenant={currentTenant}
        currentPermission={currentPermission}
        component={CustomLoadable({
          loader: route.loader,
        })}
      />}
       />
     ))}
     
        
     {routes.deactiveTenant.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<DeactiveTenantRoute
          key={route.path}
          exact
          path={route.path}
          currentUser={currentUser}
          currentTenant={currentTenant}
          currentPermission={currentPermission}
          component={CustomLoadable({
            loader: route.loader,
          })}
        />}
        />
     ))}
    {routes.emailUnverifiedRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<EmailUnverifiedRoute
          key={route.path}
          exact
          path={route.path}
          currentUser={currentUser}
          currentTenant={currentTenant}
          currentPermission={currentPermission}
          component={CustomLoadable({
            loader: route.loader,
          })}
        />}
        />
      ))}
       {routes.twoFA.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={  <TwoFARoute
        key={route.path}
        exact
        path={route.path}
        currentUser={currentUser}
        currentTenant={currentTenant}
        currentPermission={currentPermission}
        component={CustomLoadable({
          loader: route.loader,
        })}
      />}
       />
     ))}
      {routes.emptyTenantRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={ <EmptyTenantRoute
        key={route.path}
        exact
        path={route.path}
        currentUser={currentUser}
        currentTenant={currentTenant}
        currentPermission={currentPermission}
        component={CustomLoadable({
          loader: route.loader,
        })}
      /> }
       />
     ))}

    {routes.emptyPermissionsRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<EmptyPermissionsRoute
        key={route.path}
        exact
        path={route.path}
        currentUser={currentUser}
        currentTenant={currentTenant}
        currentPermission={currentPermission}
        component={CustomLoadable({
          loader: route.loader,
        })}
      /> }
       />
     ))}

{routes.privateRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<PrivateRoute
        key={route.path}
        currentUser={currentUser}
        currentTenant={currentTenant}
        permissionRequired={route.permissionRequired}
        currentPermission={currentPermission}
        path={route.path}
        component={CustomLoadable({
          loader: route.loader,
        })}
        exact={Boolean(route.exact)}
      /> }
       />
     ))}


{routes.accountCenterRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<AccountCenterRoute
        key={route.path}
        currentUser={currentUser}
        currentTenant={currentTenant}
        permissionRequired={route.permissionRequired}
        currentPermission={currentPermission}
        path={route.path}
        component={CustomLoadable({
          loader: route.loader,
        })}
        exact={Boolean(route.exact)}
      /> }
       />
     ))}

    

{routes.simpleRoutes.map((route) => {
        const Dashboard = CustomLoadable({
          loader: route.loader,
        })
        return (
        <Route
          key={route.path}
          path={route.path}
          element={<Dashboard />}
        />
      )})}
      
    </Routes>
  );
}

export default RoutesComponent;
