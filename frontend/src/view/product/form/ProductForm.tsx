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
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';

const schema = yup.object().shape({
  productName: yupFormSchemas.string(
    i18n('entities.product.fields.productName'),
    {},
  ),
  productDescription: yupFormSchemas.string(
    i18n('entities.product.fields.productDescription'),
    {},
  ),
  price: yupFormSchemas.decimal(
    i18n('entities.product.fields.price'),
    {
      "scale": 2
    },
  ),
  sellingPrice: yupFormSchemas.decimal(
    i18n('entities.product.fields.sellingPrice'),
    {
      "scale": 2
    },
  ),
  stockUnit: yupFormSchemas.integer(
    i18n('entities.product.fields.stockUnit'),
    {},
  ),
  category: yupFormSchemas.relationToOne(
    i18n('entities.product.fields.category'),
    {},
  ),
  productImages: yupFormSchemas.images(
    i18n('entities.product.fields.productImages'),
    {
      "max": 5
    },
  ),
});

const ProductForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      productName: record.productName,
      productDescription: record.productDescription,
      price: record.price,
      sellingPrice: record.sellingPrice,
      stockUnit: record.stockUnit,
      category: record.category,
      productImages: record.productImages || [],
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
            name="productName"
            label={i18n('entities.product.fields.productName')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <TextAreaFormItem
            name="productDescription"
            label={i18n('entities.product.fields.productDescription')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="price"
            label={i18n('entities.product.fields.price')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="sellingPrice"
            label={i18n('entities.product.fields.sellingPrice')}  
            required={false}
            layout={formItemLayout}
          />
          <InputNumberFormItem
            name="stockUnit"
            label={i18n('entities.product.fields.stockUnit')}  
            required={false}
            layout={formItemLayout}
          />
          <ProductCategoryAutocompleteFormItem  
            name="category"
            label={i18n('entities.product.fields.category')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
          />
          <ImagesFormItem
            name="productImages"
            label={i18n('entities.product.fields.productImages')}
            required={false}
            storage={Storage.values.productProductImages}
            max={5}
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

export default ProductForm;
