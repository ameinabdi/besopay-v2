import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useAppSelector } from 'src/modules/hook';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Spinner from 'src/view/shared/Spinner';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import { useLocation } from 'react-router-dom';
import { Button, Typography,Divider } from 'antd';
import Content from 'src/view/auth/styles/Content';
import PaymentService from 'src/modules/payment/paymentService';
import Lottie from 'react-lottie';
import * as animationData from './success.json'
import {
  LockOutlined,
} from '@ant-design/icons';

const {Text, Title } =Typography;
function SuccessPage() {
  const location = useLocation();
  const [redirectUrl, setRedirectUrl] = React.useState(null);
  const loading = useAppSelector(
    invitationSelectors.selectLoading,
  );
  

  const query = queryString.parse(location.search);
  

  useEffect( () => {
    fetchSessionId({...query, paymentResponse:query});
  }, [query]);
 
  const fetchSessionId = async (data) => {
    try {
     const response =  await PaymentService.successSession(data);
     setRedirectUrl(response)
      return 
    } catch (error) {
      
     } finally {
    }
  };
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
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
      <Content>
        <div >
      <Lottie 
        options={defaultOptions}
        height={400}
        width={400}
      />
      <Title style={{alignSelf:'center',textAlign:'center'}} level={2}>Successfully Paid</Title>
      <a href={`${redirectUrl}`} >
      <Button
              type="primary"
              style={{height:50, marginTop:10}}
              block
              size='large'
            >
           Go Back
         </Button>
         </a>
      </div>
      <Divider  variant="dashed" style={{  borderColor: '#959b92' }} dashed > <LockOutlined /></Divider>
      <Text type='secondary' style={{textAlign:'center'}}>Secured By Besopay</Text>
      </Content>
    </Wrapper>
  );
}

export default SuccessPage;
