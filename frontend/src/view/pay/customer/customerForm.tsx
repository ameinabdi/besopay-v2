import {
    SaveOutlined,
  } from '@ant-design/icons';
  import { Button, Form, Row, Col, Typography } from 'antd';
  import { useForm, FormProvider } from 'react-hook-form';
  import React, { useState } from 'react';
  import { i18n } from 'src/i18n';
  import FormWrapper, {
  } from 'src/view/shared/styles/FormWrapper';
  import * as yup from 'yup';
  import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
  import { yupResolver } from '@hookform/resolvers/yup';
  import InputFormItem from 'src/view/shared/form/items/InputFormItem';
  import PhoneInputFormItem from 'src/view/shared/form/items/PhoneInputFormItem';
  import { Link } from 'react-router-dom';

  const { Text } = Typography
  const schema = yup.object().shape({
    fullname: yupFormSchemas.string(
      i18n('entities.customer.fields.fullname'),
      {
        "required": true
      },
    ),
    email: yupFormSchemas.string(
      i18n('entities.customer.fields.email'),
      {
        "required": true,
      },
    ),
    telephone: yupFormSchemas.string(
      i18n('entities.customer.fields.telephone'),
      {
        "required": true,
        matches: /^[0-9]/,
        max: 11,
      },
    ),
  });
  
  const PublicCustomerForm = (props) => {
    const [initialValues] = useState(() => {
      const record = props.record || {};
  
      return {
        fullname: record.fullname,
        email: record.email,
        telephone: record.telephone,
      };
    });
  
    const form = useForm({
      resolver: yupResolver(schema),
      mode: 'all',
      defaultValues: initialValues as any,
    });
  
    const onSubmit = (values) => {
      // const fullData ={ 
      //   fullname: values.fullname,
      //   email: values.email,
      //   telephone:'+252'+ values.telephone,
      //  }
    };
  
    const { saveLoading } = props;
    return (
      <FormWrapper>
        
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Row>
                <Col span={24}>
                    <Text>{i18n('entities.customer.fields.fullname')}</Text>
                    <InputFormItem
                    name="fullname"
                    required={true}
                    layout={null}
                    size="large"
                    autoFocus
                    />
                </Col>
                <Col span={24}>
                    <Text>{i18n('entities.customer.fields.email')}</Text>
                    <InputFormItem
                    name="email"
                    required={false}
                    layout={null}
                    size="large"

                    />
                
                </Col>
                <Col span={24}>
                    <Text>{i18n('entities.customer.fields.telephone')}</Text>
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
            <Link to={{pathname: `/pay/customer=`}} >
              <Button
                size='large'
                block
                loading={saveLoading}
                type="primary"
                icon={<SaveOutlined />}
              >
                {i18n('common.save')}
              </Button>
             </Link>
            </Form.Item>
          </form>
        </FormProvider>
      </FormWrapper>
    );
  };
  
  export default PublicCustomerForm;
  