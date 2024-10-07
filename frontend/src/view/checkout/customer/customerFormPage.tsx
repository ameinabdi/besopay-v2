import React, {  useState } from 'react';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import CustomerForm from 'src/view/pay/customer/customerForm';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
const PaymentFormPage = (props) => {
  const [dispatched, setDispatched] = useState(false);
  const match =useParams();
  

  const isEditing = Boolean(match.id);


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
