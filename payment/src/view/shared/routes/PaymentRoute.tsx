import React from 'react';

function PaymentRoute({
  component: Component,
  ...rest
}) {

    return <Component {...rest} />;
}

export default PaymentRoute;
