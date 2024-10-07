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
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import moment from 'moment';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import BusinessAccountsAutocompleteFormItem from 'src/view/businessAccounts/autocomplete/BusinessAccountsAutocompleteFormItem';

const schema = yup.object().shape({
  bankAccount: yupFormSchemas.relationToOne(
    i18n('entities.withdraw.fields.bankAccount'),
    {},
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.withdraw.fields.amount'),
    {
      "scale": 4
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.withdraw.fields.description'),
    {},
  ),
  paid: yupFormSchemas.datetime(
    i18n('entities.withdraw.fields.paid'),
    {},
  ),
});

const WithdrawForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      bankAccount: record.bankAccount,
      amount: record.amount,
      description: record.description,
      paid: record.paid ? moment(record.paid) : null,
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
          <BusinessAccountsAutocompleteFormItem  
            name="bankAccount"
            label={i18n('entities.withdraw.fields.bankAccount')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="amount"
            label={i18n('entities.withdraw.fields.amount')}  
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="description"
            label={i18n('entities.withdraw.fields.description')}  
            required={false}
            layout={formItemLayout}
          />
          <DatePickerFormItem
            name="paid"
            label={i18n('entities.withdraw.fields.paid')}
            required={false}
            showTime
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

export default WithdrawForm;
