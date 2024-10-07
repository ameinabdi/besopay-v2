import React, { useEffect } from 'react';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import {useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import actions from 'src/modules/pay/view/payViewActions';
import selectors from 'src/modules/pay/view/payViewSelectors';
import { Tabs } from 'antd';
import Zaad from 'src/view/pay/paymentMethods/Zaad';
import Edahab from './paymentMethods/Edahab';

const { TabPane } = Tabs;


 

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
      <Tabs type="card"  tabPosition="top" centered animated={{inkBar:true, tabPane:true}} className='h-full	 w-full   '>
        <TabPane tab={
        <div  className='flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center bg-green-400 w-24 h-24 rounded-full '>
          <img
            src='/images/zaad.png'
            className='w-16 h-16'
            alt={i18n('app.title')}
          />
          </div>
          <p className='mt-3 text-gray-500 '>ZAAD</p>
        </div>
        } key="1"  style={{height:'69vh', padding:0, backgroundColor:'white'}}>
         <Zaad business={record} />
        </TabPane>
        <TabPane tab={
         <div  className='flex flex-col justify-center items-center'>
         <div className='flex justify-center items-center bg-green-400 w-24 h-24 rounded-full '>
              <img
            src='/images/edahab.png'
            className='w-16 h-16'
            alt={i18n('app.title')}
          />
                  </div>
          <p className='mt-3 text-gray-500'>EDAHAB</p>
          </div>
        } key="2" style={{height:'69vh', padding:0, backgroundColor:'white'}}>
         <Edahab business={record} />
        </TabPane>
        </Tabs>
      </Content>
    </Wrapper>
  );
};

export default PayPage;
