import React, {   } from 'react';

import { i18n } from 'src/i18n';
import CustomerForm from 'src/view/pay/customer/customerForm';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
const PaymentFormPage = (props) => {
  



  return (
    <Wrapper>
    <Content >
      <img
              src='/images/beso.png'
              width="100px"
              alt={i18n('app.title')}
            />
                <h1 className=" text-3xl">{i18n('app.title')}</h1>
          <CustomerForm />
          <p className=" text-sx">Copyright@besopay.com</p>
      </Content>
    </Wrapper>
  );
};

export default PaymentFormPage;
