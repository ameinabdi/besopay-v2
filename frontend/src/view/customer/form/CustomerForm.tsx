import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  formItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import PhoneInputFormItem from 'src/view/shared/form/items/PhoneInputFormItem';

const schema = yup.object().shape({
  fullname: yupFormSchemas.string(
    i18n('entities.customer.fields.fullname'),
    {
      "required": true
    },
  ),
  email: yupFormSchemas.string(
    i18n('entities.customer.fields.email'),
    {},
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

const CustomerForm = (props) => {
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

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const onSubmit = (values) => {
    const fullData ={ 
      fullname: values.fullname,
      email: values.email,
      telephone:'+252'+ values.telephone,
     }
     props.onSubmit(props?.record?.id, fullData);
  };

  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormItem
            name="fullname"
            label={i18n('entities.customer.fields.fullname')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="email"
            label={i18n('entities.customer.fields.email')}  
            required={false}
            layout={formItemLayout}
          />
         
          <PhoneInputFormItem
              name="telephone"
              placeholder='6x-xxxxxx'
              label={i18n('entities.customer.fields.telephone')}  
              layout={formItemLayout}
              Min={9}
              Max={11}
            />

          <Form.Item
            className="form-buttons"
          >
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined />}
              >
                {i18n('common.cancel')}
              </Button>
            )}
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default CustomerForm;
