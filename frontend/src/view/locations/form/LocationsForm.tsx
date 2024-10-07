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
import locationsEnumerators from 'src/modules/locations/locationsEnumerators';

const schema = yup.object().shape({
  city: yupFormSchemas.string(
    i18n('entities.locations.fields.city'),
    {
      "required": true
    },
  ),
  state: yupFormSchemas.string(
    i18n('entities.locations.fields.state'),
    {},
  ),
  country: yupFormSchemas.string(
    i18n('entities.locations.fields.country'),
    {},
  ),
  streetAddress: yupFormSchemas.string(
    i18n('entities.locations.fields.streetAddress'),
    {},
  ),
  type: yupFormSchemas.enumerator(
    i18n('entities.locations.fields.type'),
    {
      "options": locationsEnumerators.type
    },
  ),
});

const LocationsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      city: record.city,
      state: record.state,
      country: record.country,
      streetAddress: record.streetAddress,
      type: record.type,
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
            name="city"
            label={i18n('entities.locations.fields.city')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="state"
            label={i18n('entities.locations.fields.state')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="country"
            label={i18n('entities.locations.fields.country')}  
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="streetAddress"
            label={i18n('entities.locations.fields.streetAddress')}  
            required={false}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="type"
            label={i18n('entities.locations.fields.type')}
            options={locationsEnumerators.type.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.locations.enumerators.type.${value}`,
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

export default LocationsForm;
