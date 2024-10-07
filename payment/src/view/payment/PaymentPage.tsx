import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';
import { Avatar, Tabs } from 'antd';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Spinner from 'src/view/shared/Spinner';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import { useLocation } from 'react-router-dom';
import {  Typography } from 'antd';
import selectors from 'src/modules/payment/list/paymentListSelectors';
import paymentActions from 'src/modules/payment/list/paymentListActions';
import { CheckCard } from '@ant-design/pro-components';
import PaymentForm from './PaymentForm';
import Content from 'src/view/auth/styles/Content';

const {Text } =Typography;
function PaymentPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const record = useAppSelector(selectors.selectRows);

  const loading = useAppSelector(
    invitationSelectors.selectLoading,
  );

  const token = queryString.parse(location.search).token;
  
  const [activeTabKey, setActiveTabKey] = React.useState('1');

  useEffect(() => {
    dispatch(paymentActions.doFetch(token));
  }, [dispatch, token]);

  const onChange = (key) => {

    setActiveTabKey(key);
  };


 if(loading){
  return (
    <Wrapper>
      <Content>
        <Spinner />
      </Content>
    </Wrapper>
  )
 }
  return (
    <Wrapper >
      
        <Tabs
            onChange={onChange}
            activeKey={activeTabKey}
            tabBarStyle={{
                padding:1
            }}
            tabBarGutter={4}
            size="large"
            items={record?.config?.paymentMethods?.map((item, i) => {
            const id = String(i + 1);
            return {
                label: (
                    <CheckCard
                      title={item?.name}
                      size="small"
                      avatar={<Avatar
                        size={32}
                        shape="square"
                        src={"images/"+item?.logo}
                      />}
                      description={<Text style={{fontSize:10, fontWeight:'lighter'}}>{item?.description}</Text>}
                      bordered={false}
                      checked={activeTabKey === id}
                      style={{
                        width: 163.5,
                        marginBottom: -15,
                      }}
                      onChange={() => setActiveTabKey(id)}
                    />
                  ),
                key: id,
                children: (<PaymentForm payment={record} method={item} record={item} tenant={record?.tenant}/>),
            };
            })}
        />
     
    </Wrapper>
  );
}

export default PaymentPage;
