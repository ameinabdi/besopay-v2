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
import banksEnumerators from 'src/modules/banks/banksEnumerators';

const schema = yup.object().shape({
  bankname: yupFormSchemas.string(
    i18n('entities.banks.fields.bankname'),
    {},
  ),
  banktelephone: yupFormSchemas.string(
    i18n('entities.banks.fields.banktelephone'),
    {},
  ),
  bankemail: yupFormSchemas.string(
    i18n('entities.banks.fields.bankemail'),
    {},
  ),
  bankaddress: yupFormSchemas.string(
    i18n('entities.banks.fields.bankaddress'),
    {},
  ),
  keys: yupFormSchemas.string(
    i18n('entities.banks.fields.keys'),
    {},
  ),
  bankTypes: yupFormSchemas.enumerator(
    i18n('entities.banks.fields.bankTypes'),
    {
      "required": true,
      "options": banksEnumerators.bankTypes
    },
  ),
});

const BanksForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      bankname: record.bankname,
      banktelephone: record.banktelephone,
      bankemail: record.bankemail,
      bankaddress: record.bankaddress,
      keys: record.keys,
      bankTypes: record.bankTypes,
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
            name="bankname"
            label={i18n('entities.banks.fields.bankname')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <InputFormItem
            name="banktelephone"
            label={i18n('entities.banks.fields.banktelephone')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="bankemail"
            label={i18n('entities.banks.fields.bankemail')}  
            required={false}
            layout={formItemLayout}
          />
          <TextAreaFormItem
            name="bankaddress"
            label={i18n('entities.banks.fields.bankaddress')}  
            required={false}
            layout={formItemLayout}
          />
          <InputFormItem
            name="keys"
            label={i18n('entities.banks.fields.keys')}  
            required={false}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="bankTypes"
            label={i18n('entities.banks.fields.bankTypes')}
            options={banksEnumerators.bankTypes.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.banks.enumerators.bankTypes.${value}`,
                ),
              }),
            )}
            required={true}
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

export default BanksForm;
