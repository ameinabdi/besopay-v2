import {
  LockOutlined,
} from '@ant-design/icons';
import { Button, Divider, Typography,Row, Col} from 'antd';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/payment/form/paymentFormSelectors';
import actions from 'src/modules/payment/form/paymentFormActions';

import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import FormWrapper, {
  formItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Content from 'src/view/auth/styles/Content';
import TenantItem from './TenantItem';
import SelectCheckFormItem from '../shared/form/items/SelectCheckFormItem';
import PaymentService from 'src/modules/payment/paymentService';
import Message from 'src/view/shared/message';

const { Text, } = Typography;

const schema:any = yup.object().shape({
  payment: yupFormSchemas.relationToOne(
    i18n('user.fields.payment'),
    {
       
    },
  ),
  
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
      min:9,
      required:true
    },
  ),
  fullName: yupFormSchemas.string(
    i18n('user.fields.fullName'),
    {
     
     },
  ),
  cardNumber: yupFormSchemas.string(
    i18n('user.fields.cardNumber'),
    {
      matches: /^[0-9]/,
      max: 16,
    },
  ),
  expiration: yupFormSchemas.string(
    i18n('user.fields.expiration'),
    {
      matches: /^[0-9]/,
      max: 4,
    },
  ),
  cvc: yupFormSchemas.string(
    i18n('user.fields.cvc'),
    {
      matches: /^[0-9]/,
      max: 3,
    },
  ),
  accountName: yupFormSchemas.string(
    i18n('user.fields.accountName'),
    {
    },
  ),
  accountNumber: yupFormSchemas.string(
    i18n('user.fields.accountNumber'),
    {
      matches: /^[0-9]/,
      max: 16,
    },
  ),
   
});

const PaymentForm = (props) => {
  const dispatch = useAppDispatch();

  const saveLoading = useAppSelector(
    selectors.selectSaveLoading,
  );
  const { payment, method, record, tenant } = props;
  const [initialValues] = useState(() => {

    return {
      payment: null,
      phoneNumber: null,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });
  const selectPayment = record.payment.find((item)=>(item.id === form.watch('payment')))


  const onSubmit:any = (values) => {
    const payload = {
      ...values,
      tenant,
      paymentMethod:selectPayment,
      payment
    }
    dispatch(actions.doPay(payload, payment?.callbackUrl));
  };


  const fetchSessionId = async (data) => {
    try {
      const record = await PaymentService.createSession(data);
      return record
    } catch (error) {
      Message.error(
        error
      );   
     } 
  };

  React.useEffect(() => {
    if (selectPayment?.name === "International Cards") {
      initiateHostedCheckout()
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPayment]);

  const initiateHostedCheckout = async () => {
    const sessionId = await fetchSessionId(payment);
      //@ts-ignore
    if(!window.Checkout){
      console.log('window checkout is not found')
      return 
    }
    //@ts-ignore
    window.Checkout.configure({
      session: {
        id: sessionId
      },
    });
  
    //@ts-ignore
    window.Checkout.showEmbeddedPage('#embed-target');
  };

  const Forms = () => {
    if(method.name === 'Wallet'){
      return(
        <>
        <InputFormItem
            name="phoneNumber"
            label={i18n('user.fields.phoneNumber')}
            placeholder={selectPayment?.placeholder}
            autoComplete="phoneNumber"
            size="large"
            layout={formItemLayout}
        />
         <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              style={{height:50}}
              block
              size='large'
            >
           {i18n('common.pay')} {payment?.amount}  {`(${payment?.currency})`} 
         </Button>
        </>
      )}
      if(method.name === "Card"){
        if(selectPayment?.name === "International Cards"){
          return(
            <>
              <div id="embed-target">
              </div>
            </>
          )
        }else{
          return(
            <>
            <Row>
              <Col span={24}>
                <InputFormItem
                  name="fullName"
                  label={i18n('user.fields.fullName')}
                  placeholder={selectPayment?.placeholder}
                  autoComplete="fullName"
                  size="large"
                  layout={formItemLayout}
              />
              </Col>
              <Col span={24}>
                <InputFormItem
                  name="cardNumber"
                  label={i18n('user.fields.cardNumber')}
                  placeholder={selectPayment?.placeholder}
                  autoComplete="cardNumber"
                  maxLength={16}
                  size="large"
                  layout={formItemLayout}
              />
              </Col>
              <Col span={11}>
                <InputFormItem
                  name="expiration"
                  label={i18n('user.fields.expiration')}
                  placeholder={selectPayment?.placeholder}
                  autoComplete="expiration"
                  maxLength={4}
                  size="large"
                  layout={formItemLayout}
                />
              </Col>
              <Col span={2}/>
              <Col span={11}>
                <InputFormItem
                  name="cvc"
                  label={i18n('user.fields.cvc')}
                  placeholder={selectPayment?.placeholder}
                  autoComplete="cvc"
                  maxLength={16}
                  size="large"
                  layout={formItemLayout}
                />
              </Col>
            </Row>
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              style={{height:50}}
              block
              size='large'
            >
           {i18n('common.pay')} {payment?.amount}  {`(${payment?.currency})`} 
            </Button>
            </>
          )
        }
       
      }
      if(method.name === 'Bank'){
        return(
          <>
          <Row>
            <Col span={24}>
              <InputFormItem
                name="accountName"
                label={i18n('user.fields.accountName')}
                placeholder={selectPayment?.placeholder}
                autoComplete="accountName"
                size="large"
                layout={formItemLayout}
            />
            </Col>
            <Col span={24}>
            <InputFormItem
                name="accountNumber"
                label={i18n('user.fields.accountNumber')}
                placeholder={selectPayment?.placeholder}
                autoComplete="accountNumber"
                size="large"
                layout={formItemLayout}
            />
            </Col>
        </Row>
        <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              style={{height:50}}
              block
              size='large'
            >
           {i18n('common.pay')} {payment?.amount}  {`(${payment?.currency})`} 
            </Button>
        </>
        )
      }

  }
  return (
    <Content>
      <TenantItem value={tenant}/>
      <Divider  variant="dashed" style={{  borderColor: '#01be63' }} dashed ></Divider>
      <Text style={{marginTop:-10, marginBottom:10}}>We empower you to effectively serve both international and local customers by providing access to secure digital payment solutions.</Text>

      <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SelectCheckFormItem
            name="payment"
            options={record.payment.map(
              (value) => ({
                ...value,
                value:value?.id,
                label: value?.name
              }),
            )}
            required={false}
            layout={formItemLayout}
          />
            {Forms()}
           
            
        </form>
      </FormProvider>
    </FormWrapper>
    <br />
    <br />
    <br />
    <Divider  variant="dashed" style={{  borderColor: '#959b92' }} dashed > <LockOutlined /></Divider>
    <Text type='secondary' style={{textAlign:'center'}}>Secured By Besopay</Text>
    </Content>
  );
};

export default PaymentForm;
