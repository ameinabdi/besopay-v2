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
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import BanksAutocompleteFormItem from 'src/view/banks/autocomplete/BanksAutocompleteFormItem';

const schema = yup.object().shape({
  bankTypes: yupFormSchemas.relationToOne(
    i18n('entities.paymentMethod.fields.bankTypes'),
    {},
  ),
  paymentMethodName: yupFormSchemas.string(
    i18n('entities.paymentMethod.fields.paymentMethodName'),
    {
      "required": true
    },
  ),
  paymentMethodKey: yupFormSchemas.string(
    i18n('entities.paymentMethod.fields.paymentMethodKey'),
    {},
  ),
  paymentMethodDescription: yupFormSchemas.string(
    i18n('entities.paymentMethod.fields.paymentMethodDescription'),
    {},
  ),
  paymentMethodLogo: yupFormSchemas.images(
    i18n('entities.paymentMethod.fields.paymentMethodLogo'),
    {},
  ),
  paymentMethodThumbnail: yupFormSchemas.images(
    i18n('entities.paymentMethod.fields.paymentMethodThumbnail'),
    {},
  ),
  paymentMethodActive: yupFormSchemas.boolean(
    i18n('entities.paymentMethod.fields.paymentMethodActive'),
    {},
  ),
});

const PaymentMethodForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      bankTypes: record.bankTypes,
      paymentMethodName: record.paymentMethodName,
      paymentMethodKey: record.paymentMethodKey,
      paymentMethodDescription: record.paymentMethodDescription,
      paymentMethodLogo: record.paymentMethodLogo || [],
      paymentMethodThumbnail: record.paymentMethodThumbnail || [],
      paymentMethodActive: record.paymentMethodActive,
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
          <BanksAutocompleteFormItem  
            name="bankTypes"
            label={i18n('entities.paymentMethod.fields.bankTypes')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="paymentMethodName"
            label={i18n('entities.paymentMethod.fields.paymentMethodName')}  
            required={true}
            layout={formItemLayout}
          />
          <InputFormItem
            name="paymentMethodKey"
            label={i18n('entities.paymentMethod.fields.paymentMethodKey')}  
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="paymentMethodDescription"
            label={i18n('entities.paymentMethod.fields.paymentMethodDescription')}  
            required={false}
            layout={formItemLayout}
          />
          <ImagesFormItem
            name="paymentMethodLogo"
            label={i18n('entities.paymentMethod.fields.paymentMethodLogo')}
            required={false}
            storage={Storage.values.paymentMethodPaymentMethodLogo}
            max={undefined}
            layout={formItemLayout}
          />
          <ImagesFormItem
            name="paymentMethodThumbnail"
            label={i18n('entities.paymentMethod.fields.paymentMethodThumbnail')}
            required={false}
            storage={Storage.values.paymentMethodPaymentMethodThumbnail}
            max={undefined}
            layout={formItemLayout}
          />
          <SwitchFormItem
            name="paymentMethodActive"
            label={i18n('entities.paymentMethod.fields.paymentMethodActive')}
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

export default PaymentMethodForm;
