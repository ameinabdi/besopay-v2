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
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';
import PaymentMethodAutocompleteFormItem from 'src/view/paymentMethod/autocomplete/PaymentMethodAutocompleteFormItem';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';

const schema = yup.object().shape({
  status: yupFormSchemas.enumerator(
    i18n('entities.transaction.fields.status'),
    {
      "options": transactionEnumerators.status
    },
  ),
  paymentMethod: yupFormSchemas.relationToOne(
    i18n('entities.transaction.fields.paymentMethod'),
    {},
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.transaction.fields.amount'),
    {
      "scale": 3
    },
  ),
  customer: yupFormSchemas.relationToOne(
    i18n('entities.transaction.fields.customer'),
    {},
  ),
  reference: yupFormSchemas.string(
    i18n('entities.transaction.fields.reference'),
    {},
  ),
  currency: yupFormSchemas.relationToOne(
    i18n('entities.transaction.fields.currency'),
    {},
  ),
  paymentType: yupFormSchemas.enumerator(
    i18n('entities.transaction.fields.paymentType'),
    {
      "options": transactionEnumerators.paymentType
    },
  ),
});

const TransactionForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      status: record.status,
      paymentMethod: record.paymentMethod,
      amount: record.amount,
      customer: record.customer,
      reference: record.reference,
      currency: record.currency,
      paymentType: record.paymentType,
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
          <SelectFormItem
            name="status"
            label={i18n('entities.transaction.fields.status')}
            options={transactionEnumerators.status.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.transaction.enumerators.status.${value}`,
                ),
              }),
            )}
            required={false}
            layout={formItemLayout}
          />
          <PaymentMethodAutocompleteFormItem  
            name="paymentMethod"
            label={i18n('entities.transaction.fields.paymentMethod')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="amount"
            label={i18n('entities.transaction.fields.amount')}  
            required={false}
            layout={formItemLayout}
          />
          <CustomerAutocompleteFormItem  
            name="customer"
            label={i18n('entities.transaction.fields.customer')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="reference"
            label={i18n('entities.transaction.fields.reference')}  
            required={false}
            layout={formItemLayout}
          />
          <CurrencyAutocompleteFormItem  
            name="currency"
            label={i18n('entities.transaction.fields.currency')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="paymentType"
            label={i18n('entities.transaction.fields.paymentType')}
            options={transactionEnumerators.paymentType.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.transaction.enumerators.paymentType.${value}`,
                ),
              }),
            )}
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

export default TransactionForm;
