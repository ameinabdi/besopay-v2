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
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';

const schema = yup.object().shape({
  roles: yupFormSchemas.string(
    i18n('entities.roles.fields.roles'),
    {},
  ),
  description: yupFormSchemas.string(
    i18n('entities.roles.fields.description'),
    {},
  ),
  users: yupFormSchemas.relationToMany(
    i18n('entities.roles.fields.users'),
    {},
  ),
  assignToNewUser: yupFormSchemas.boolean(
    i18n('entities.roles.fields.assignToNewUser'),
    {},
  ),
});

const RolesForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      roles: record.roles,
      description: record.description,
      users: record.users || [],
      assignToNewUser: record.assignToNewUser,
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
            name="roles"
            label={i18n('entities.roles.fields.roles')}  
            required={false}
            layout={formItemLayout}
            autoFocus
          />
          <TextAreaFormItem
            name="description"
            label={i18n('entities.roles.fields.description')}  
            required={false}
            layout={formItemLayout}
          />
          <UserAutocompleteFormItem  
            name="users"
            label={i18n('entities.roles.fields.users')}
            required={false}
            showCreate={!props.modal}
            layout={formItemLayout}
            mode="multiple"
          />
          <SwitchFormItem
            name="assignToNewUser"
            label={i18n('entities.roles.fields.assignToNewUser')}
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
              icon={<SaveOutlined rev={undefined}  />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined rev={undefined}  />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined rev={undefined}  />}
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

export default RolesForm;
