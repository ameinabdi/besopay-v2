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
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';

const schema = yup.object().shape({
  optionTitle: yupFormSchemas.string(
    i18n('entities.productOptions.fields.optionTitle'),
    {},
  ),
  optionDescription: yupFormSchemas.string(
    i18n('entities.productOptions.fields.optionDescription'),
    {},
  ),
  product: yupFormSchemas.relationToOne(
    i18n('entities.productOptions.fields.product'),
    {},
  ),
});

const ProductOptionsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      optionTitle: record.optionTitle,
      optionDescription: record.optionDescription,
      product: record.product,
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
            name="optionTitle"
            label={i18n('entities.productOptions.fields.optionTitle')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="optionDescription"
            label={i18n('entities.productOptions.fields.optionDescription')}  
            required={false}
            layout={formItemLayout}
          />
          <ProductAutocompleteFormItem  
            name="product"
            label={i18n('entities.productOptions.fields.product')}
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

export default ProductOptionsForm;
