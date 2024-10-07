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
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import businessDocumentsEnumerators from 'src/modules/businessDocuments/businessDocumentsEnumerators';
import Storage from 'src/security/storage';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';

const schema = yup.object().shape({
  type: yupFormSchemas.enumerator(
    i18n('entities.businessDocuments.fields.type'),
    {
      "required": true,
      "options": businessDocumentsEnumerators.type
    },
  ),
  document: yupFormSchemas.files(
    i18n('entities.businessDocuments.fields.document'),
    {},
  ),
});

const BusinessDocumentsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      type: record.type,
      document: record.document || [],
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
            name="type"
            label={i18n('entities.businessDocuments.fields.type')}
            options={businessDocumentsEnumerators.type.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.businessDocuments.enumerators.type.${value}`,
                ),
              }),
            )}
            required={true}
            layout={formItemLayout}
          />
          <FilesFormItem
            name="document"
            label={i18n('entities.businessDocuments.fields.document')}
            required={false}
            storage={Storage.values.businessDocumentsDocument}
            max={undefined}
            formats={undefined}
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

export default BusinessDocumentsForm;
