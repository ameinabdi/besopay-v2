import { Button, Form, Row, Col } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInputFormItem from 'src/view/shared/form/items/PhoneInputFormItem';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import actions from 'src/modules/pay/form/payFormActions';
import selectors from 'src/modules/pay/form/payFormSelectors';

const schema = yup.object().shape({
  
  telephone: yupFormSchemas.string(
    i18n('entities.customer.fields.telephone'),
    {
      "required": true,
      matches: /^[0-9]/,
      max: 11,
    },
  ),
});

const Zaad = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      telephone: record.telephone,
    };
  });
 const dispatch = useAppDispatch();
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const {  business } = props;

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });


  const onSubmit = (values) => {
    const fullData ={ 
      tenantId:business.tenantId,
      tenantName:business.businessName,
      totalAmount:business?.price,
      telephone:'252'+ values.telephone,
      fullname:business?.fullname,
      paymentType:business?.paymentType,
      email:business?.email,
      currency:business?.currency,
      reference:business?.reference
     }
     dispatch(actions.doCreateWithZaad(fullData));
    };

  return (
    <div className=' h-full px-5 py-20' >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full w-full  flex flex-col">
             <h1 className=' text-4xl text-center'>{business?.amount}</h1>
                <h1 className=' text-2xl text-center'>{business?.currency}</h1>
          <Row className=' mt-10'>
              <Col span={24}>
                  <PhoneInputFormItem
                  name="telephone"
                  placeholder='6x-xxxxxx'
                  layout={null}
                  size="large"
                  Min={9}
                  Max={11}
                  />
              </Col>
          </Row>

          <Form.Item
            className="form-buttons"
          >
            
            <Button
              size='large'
              block
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
            >
              {i18n('common.pay')}
            </Button>
          </Form.Item>
        </form>
      </FormProvider>
    </div>
  );
};

export default Zaad;
