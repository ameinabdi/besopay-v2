import React, { useEffect } from 'react';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import {useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import actions from 'src/modules/pay/view/payViewActions';
import selectors from 'src/modules/pay/view/payViewSelectors';
import CustomerForm from 'src/view/checkout/customer/customerForm';

const PayPage = (props) => {
 const dispatch = useAppDispatch();
  const match =useParams();
  const record = useSelector(selectors.selectCheckout);
  useEffect(() => {
   dispatch(actions.doFindCheckout(match.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
    <Content>
      <div className='flex flex-row justify-between w-full'>
        <div>
          <img
            src='/images/beso.png'
            width="50px"
            alt={i18n('app.title')}
          />
        </div>
        <div >
          <h2 className='text-xl'>{record?.businessName}</h2>
          <h2>{record?.businessEmail}</h2>
        </div>
      </div>
      <CustomerForm checkout={record}/>
      <p className=" text-sx">Copyright@besopay.com</p>
    </Content>
   </Wrapper>
  );
};

export default PayPage;
