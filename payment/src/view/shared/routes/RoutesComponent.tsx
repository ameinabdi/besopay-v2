import authSelectors from 'src/modules/auth/authSelectors';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import CustomLoadable from 'src/view/shared/CustomLoadable';
import ProgressBar from 'src/view/shared/ProgressBar';
import routes from 'src/view/routes';
import PaymentRoute from './PaymentRoute';

function RoutesComponent(props) {
  const isInitialMount = useRef(true);

  const authLoading = useSelector(
    authSelectors.selectLoadingInit,
  );
  const layoutLoading = useSelector(
    layoutSelectors.selectLoading,
  );
  const loading = authLoading || layoutLoading;


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
     {routes.paymentRoutes.map((route) => (
       <Route
       key={route.path}
       path={route.path}
       element={<PaymentRoute
          key={route.path}
          exact
          path={route.path}
          component={CustomLoadable({
            loader: route.loader,
          })}
        />}
        />
     ))}
  
      
    </Routes>
  );
}

export default RoutesComponent;
