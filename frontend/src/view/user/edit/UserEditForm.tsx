import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import actions from 'src/modules/user/form/userFormActions';
import selectors from 'src/modules/user/form/userFormSelectors';
import FormWrapper, {
  tailFormItemLayout,
  formItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RolesAutocompleteFormItem from 'src/view/roles/autocomplete/RolesAutocompleteFormItem';

const schema = yup.object().shape({
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    {
      
    }
  ),
  inRoles: yupFormSchemas.relationToOne(
    i18n('user.fields.roles'),
    {},
  ),
});

const UserEditForm = (props) => {
  const dispatch = useAppDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const [initialValues] = useState(() => props.user || {});

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      id: props.user.id,
      ...values,
    };
    delete data.email;
    dispatch(actions.doUpdate(data));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Item
            {...formItemLayout}
            labelAlign='left'
            label={i18n('user.fields.email')}
          >
            <strong>{props.user.email}</strong>
          </Form.Item>

          <RolesAutocompleteFormItem
            name="inRoles"
            label={i18n('user.fields.roles')}
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
              icon={<SaveOutlined   />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined   />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined   />}
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

export default UserEditForm;
