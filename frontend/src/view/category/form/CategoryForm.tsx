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
import categoryEnumerators from 'src/modules/category/categoryEnumerators';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';

const schema = yup.object().shape({
  categoryName: yupFormSchemas.string(
    i18n('entities.category.fields.categoryName'),
    {
      "required": true
    },
  ),
  types: yupFormSchemas.enumerator(
    i18n('entities.category.fields.types'),
    {
      "options": categoryEnumerators.types
    },
  ),
  active: yupFormSchemas.boolean(
    i18n('entities.category.fields.active'),
    {},
  ),
  colorCode: yupFormSchemas.string(
    i18n('entities.category.fields.colorCode'),
    {},
  ),
  thumnail: yupFormSchemas.images(
    i18n('entities.category.fields.thumnail'),
    {
      "required": true
    },
  ),
});

const CategoryForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      categoryName: record.categoryName,
      types: record.types,
      active: record.active,
      colorCode: record.colorCode,
      thumnail: record.thumnail || [],
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
            name="categoryName"
            label={i18n('entities.category.fields.categoryName')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <SelectFormItem
            name="types"
            label={i18n('entities.category.fields.types')}
            options={categoryEnumerators.types.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.category.enumerators.types.${value}`,
                ),
              }),
            )}
            required={false}
            layout={formItemLayout}
          />
          <SwitchFormItem
            name="active"
            label={i18n('entities.category.fields.active')}
            layout={formItemLayout}
          />
          <InputFormItem
            name="colorCode"
            label={i18n('entities.category.fields.colorCode')}  
            required={false}
            layout={formItemLayout}
          />
          <ImagesFormItem
            name="thumnail"
            label={i18n('entities.category.fields.thumnail')}
            required={true}
            storage={Storage.values.categoryThumnail}
            max={undefined}
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

export default CategoryForm;
