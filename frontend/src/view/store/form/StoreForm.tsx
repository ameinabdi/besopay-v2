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
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import storeEnumerators from 'src/modules/store/storeEnumerators';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';

const schema = yup.object().shape({
  storename: yupFormSchemas.string(
    i18n('entities.store.fields.storename'),
    {},
  ),
  storedescription: yupFormSchemas.string(
    i18n('entities.store.fields.storedescription'),
    {},
  ),
  storeImage: yupFormSchemas.images(
    i18n('entities.store.fields.storeImage'),
    {},
  ),
  storeURL: yupFormSchemas.string(
    i18n('entities.store.fields.storeURL'),
    {},
  ),
  storeCategory: yupFormSchemas.enumerator(
    i18n('entities.store.fields.storeCategory'),
    {
      "options": storeEnumerators.storeCategory
    },
  ),
});

const StoreForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      storename: record.storename,
      storedescription: record.storedescription,
      storeImage: record.storeImage || [],
      storeURL: record.storeURL,
      storeCategory: record.storeCategory,
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
            name="storename"
            label={i18n('entities.store.fields.storename')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <TextAreaFormItem
            name="storedescription"
            label={i18n('entities.store.fields.storedescription')}  
            required={false}
            layout={formItemLayout}
          />
          <ImagesFormItem
            name="storeImage"
            label={i18n('entities.store.fields.storeImage')}
            required={false}
            storage={Storage.values.storeStoreImage}
            max={undefined}
            layout={formItemLayout}
          />
          <InputFormItem
            name="storeURL"
            label={i18n('entities.store.fields.storeURL')}  
            required={false}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="storeCategory"
            label={i18n('entities.store.fields.storeCategory')}
            options={storeEnumerators.storeCategory.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.store.enumerators.storeCategory.${value}`,
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

export default StoreForm;
