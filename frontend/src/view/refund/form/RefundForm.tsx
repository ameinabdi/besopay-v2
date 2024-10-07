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
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import refundEnumerators from 'src/modules/refund/refundEnumerators';
import TransactionAutocompleteFormItem from 'src/view/transaction/autocomplete/TransactionAutocompleteFormItem';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';

const schema = yup.object().shape({
  transaction: yupFormSchemas.relationToOne(
    i18n('entities.refund.fields.transaction'),
    {},
  ),
  transactionAmound: yupFormSchemas.decimal(
    i18n('entities.refund.fields.transactionAmound'),
    {
      "scale": 2
    },
  ),
  refundType: yupFormSchemas.enumerator(
    i18n('entities.refund.fields.refundType'),
    {
      "options": refundEnumerators.refundType
    },
  ),
  customerNote: yupFormSchemas.string(
    i18n('entities.refund.fields.customerNote'),
    {},
  ),
  businessNote: yupFormSchemas.string(
    i18n('entities.refund.fields.businessNote'),
    {},
  ),
  customer: yupFormSchemas.relationToOne(
    i18n('entities.refund.fields.customer'),
    {},
  ),
});

const RefundForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      transaction: record.transaction,
      transactionAmound: record.transactionAmound,
      refundType: record.refundType,
      customerNote: record.customerNote,
      businessNote: record.businessNote,
      customer: record.customer,
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
          <TransactionAutocompleteFormItem  
            name="transaction"
            label={i18n('entities.refund.fields.transaction')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="transactionAmound"
            label={i18n('entities.refund.fields.transactionAmound')}  
            required={false}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="refundType"
            label={i18n('entities.refund.fields.refundType')}
            options={refundEnumerators.refundType.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.refund.enumerators.refundType.${value}`,
                ),
              }),
            )}
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="customerNote"
            label={i18n('entities.refund.fields.customerNote')}  
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="businessNote"
            label={i18n('entities.refund.fields.businessNote')}  
            required={false}
            layout={formItemLayout}
          />
          <CustomerAutocompleteFormItem  
            name="customer"
            label={i18n('entities.refund.fields.customer')}
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

export default RefundForm;
