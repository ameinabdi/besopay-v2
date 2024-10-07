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
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import InvoiceAutocompleteFormItem from 'src/view/invoice/autocomplete/InvoiceAutocompleteFormItem';

const schema = yup.object().shape({
  invoice: yupFormSchemas.relationToOne(
    i18n('entities.invoiceItems.fields.invoice'),
    {},
  ),
  item: yupFormSchemas.string(
    i18n('entities.invoiceItems.fields.item'),
    {},
  ),
  quantity: yupFormSchemas.integer(
    i18n('entities.invoiceItems.fields.quantity'),
    {},
  ),
  unitPrice: yupFormSchemas.decimal(
    i18n('entities.invoiceItems.fields.unitPrice'),
    {},
  ),
  totalAmount: yupFormSchemas.decimal(
    i18n('entities.invoiceItems.fields.totalAmount'),
    {},
  ),
});

const InvoiceItemsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      invoice: record.invoice,
      item: record.item,
      quantity: record.quantity,
      unitPrice: record.unitPrice,
      totalAmount: record.totalAmount,
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
          <InvoiceAutocompleteFormItem  
            name="invoice"
            label={i18n('entities.invoiceItems.fields.invoice')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <InputFormItem
            name="item"
            label={i18n('entities.invoiceItems.fields.item')}  
            required={false}
            layout={formItemLayout}
          />
          <InputNumberFormItem
            name="quantity"
            label={i18n('entities.invoiceItems.fields.quantity')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="unitPrice"
            label={i18n('entities.invoiceItems.fields.unitPrice')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="totalAmount"
            label={i18n('entities.invoiceItems.fields.totalAmount')}  
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

export default InvoiceItemsForm;
