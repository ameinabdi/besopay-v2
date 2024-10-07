import React from 'react';
import { useAppSelector } from 'src/modules/hook';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Spinner from 'src/view/shared/Spinner';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import { Button, Typography,Divider } from 'antd';
import Content from 'src/view/auth/styles/Content';
import Lottie from 'react-lottie';
import * as animationData from './success.json'
import {
  LockOutlined,
} from '@ant-design/icons';

const {Text, Title } =Typography;
function SuccessPaidPage() {
  const loading = useAppSelector(
    invitationSelectors.selectLoading,
  );
  
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
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
      <Button
              type="primary"
              style={{height:50, marginTop:10}}
              block
              size='large'
              onClick={closeTab}
            >
           Go Back
         </Button>
      </div>
      <Divider  variant="dashed" style={{  borderColor: '#959b92' }} dashed > <LockOutlined /></Divider>
      <Text type='secondary' style={{textAlign:'center'}}>Secured By Besopay</Text>
      </Content>
    </Wrapper>
  );
}

export default SuccessPaidPage;
