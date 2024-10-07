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
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import paymentEnumerators from 'src/modules/payment/paymentEnumerators';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';
import PaymentLinkAutocompleteFormItem from 'src/view/paymentLink/autocomplete/PaymentLinkAutocompleteFormItem';
import InvoiceAutocompleteFormItem from 'src/view/invoice/autocomplete/InvoiceAutocompleteFormItem';
import PaymentMethodAutocompleteFormItem from 'src/view/paymentMethod/autocomplete/PaymentMethodAutocompleteFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';

const schema = yup.object().shape({
  customer: yupFormSchemas.relationToOne(
    i18n('entities.payment.fields.customer'),
    {},
  ),
  paymentType: yupFormSchemas.enumerator(
    i18n('entities.payment.fields.paymentType'),
    {
      "options": paymentEnumerators.paymentType
    },
  ),
  product: yupFormSchemas.relationToOne(
    i18n('entities.payment.fields.product'),
    {},
  ),
  paymentLink: yupFormSchemas.relationToOne(
    i18n('entities.payment.fields.paymentLink'),
    {},
  ),
  invoice: yupFormSchemas.relationToOne(
    i18n('entities.payment.fields.invoice'),
    {},
  ),
  paymentMethod: yupFormSchemas.relationToOne(
    i18n('entities.payment.fields.paymentMethod'),
    {},
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.payment.fields.amount'),
    {
      "scale": 4
    },
  ),
  paid: yupFormSchemas.boolean(
    i18n('entities.payment.fields.paid'),
    {},
  ),
  currency: yupFormSchemas.relationToOne(
    i18n('entities.payment.fields.currency'),
    {},
  ),
});

const PaymentForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      customer: record.customer,
      paymentType: record.paymentType,
      product: record.product,
      paymentLink: record.paymentLink,
      invoice: record.invoice,
      paymentMethod: record.paymentMethod,
      amount: record.amount,
      paid: record.paid,
      currency: record.currency,
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
          <CustomerAutocompleteFormItem  
            name="customer"
            label={i18n('entities.payment.fields.customer')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="paymentType"
            label={i18n('entities.payment.fields.paymentType')}
            options={paymentEnumerators.paymentType.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.payment.enumerators.paymentType.${value}`,
                ),
              }),
            )}
            required={false}
            layout={formItemLayout}
          />
          <ProductAutocompleteFormItem  
            name="product"
            label={i18n('entities.payment.fields.product')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <PaymentLinkAutocompleteFormItem  
            name="paymentLink"
            label={i18n('entities.payment.fields.paymentLink')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InvoiceAutocompleteFormItem  
            name="invoice"
            label={i18n('entities.payment.fields.invoice')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <PaymentMethodAutocompleteFormItem  
            name="paymentMethod"
            label={i18n('entities.payment.fields.paymentMethod')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="amount"
            label={i18n('entities.payment.fields.amount')}  
            required={false}
            layout={formItemLayout}
          />
          <SwitchFormItem
            name="paid"
            label={i18n('entities.payment.fields.paid')}
            layout={formItemLayout}
          />
          <CurrencyAutocompleteFormItem  
            name="currency"
            label={i18n('entities.payment.fields.currency')}
            required={false}
            showCreate={!props.modal}
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

export default PaymentForm;
