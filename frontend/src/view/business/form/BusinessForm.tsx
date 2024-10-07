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
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

const schema = yup.object().shape({
  fullname: yupFormSchemas.string(
    i18n('entities.business.fields.fullname'),
    {
      "required": true
    },
  ),
  businessName: yupFormSchemas.string(
    i18n('entities.business.fields.businessName'),
    {
      "required": true
    },
  ),
  email: yupFormSchemas.string(
    i18n('entities.business.fields.email'),
    {
      "required": true
    },
  ),
  country: yupFormSchemas.string(
    i18n('entities.business.fields.country'),
    {},
  ),
  password: yupFormSchemas.string(
    i18n('entities.business.fields.password'),
    {},
  ),
});

const BusinessForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      fullname: record.fullname,
      businessName: record.businessName,
      email: record.email,
      country: record.country,
      password: record.password,
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
    props.onSubmit(props?.record?.id, values);
  };

  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormItem
            name="fullname"
            label={i18n('entities.business.fields.fullname')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="businessName"
            label={i18n('entities.business.fields.businessName')}  
            required={true}
            layout={formItemLayout}
          />
          <InputFormItem
            name="email"
            label={i18n('entities.business.fields.email')}  
            required={true}
            layout={formItemLayout}
          />
          <InputFormItem
            name="country"
            label={i18n('entities.business.fields.country')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="password"
            label={i18n('entities.business.fields.password')}  
            required={false}
            layout={formItemLayout}
          />

          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
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

export default BusinessForm;
