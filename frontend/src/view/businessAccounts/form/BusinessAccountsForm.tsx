import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form, Row, Col, Typography } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import BanksAutocompleteFormItem from 'src/view/banks/autocomplete/BanksAutocompleteFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';
const { Text } = Typography
const schema = yup.object().shape({
  bankType: yupFormSchemas.relationToOne(
    i18n('entities.businessAccounts.fields.bankType'),
    {
      "required": true
    },
  ),
  accountName: yupFormSchemas.string(
    i18n('entities.businessAccounts.fields.accountName'),
    {
      "required": true
    },
  ),
  accountNumber: yupFormSchemas.string(
    i18n('entities.businessAccounts.fields.accountNumber'),
    {
      "required": true
    },
  ),
  telephone: yupFormSchemas.string(
    i18n('entities.businessAccounts.fields.telephone'),
    {
      "required": true
    },
  ),
  currency: yupFormSchemas.relationToOne(
    i18n('entities.businessAccounts.fields.currency'),
    {},
  ),
  isPrimary: yupFormSchemas.boolean(
    i18n('entities.businessAccounts.fields.isPrimary'),
    {},
  ),
});

const BusinessAccountsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      bankType: record.bankType,
      accountName: record.accountName,
      accountNumber: record.accountNumber,
      telephone: record.telephone,
      currency: record.currency,
      isPrimary: record.isPrimary,
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
         <Row>
           <Col span={24}>
             <Text>{i18n('entities.businessAccounts.fields.bankType')}</Text>
             <BanksAutocompleteFormItem  
              name="bankType"
              placeholder={i18n('entities.businessAccounts.fields.bankType')}
              required={true}
              showCreate={!props.modal}
            />
           </Col>
           <Col span={24}>
             <Text>{i18n('entities.businessAccounts.fields.accountName')}</Text>
             <InputFormItem
              name="accountName"
              placeholder={i18n('entities.businessAccounts.fields.accountName')}  
              required={true}
            />
           </Col>
           <Col span={24}>
             <Text>{i18n('entities.businessAccounts.fields.accountNumber')}  </Text>
             <InputFormItem
              name="accountNumber"
              placeholder={i18n('entities.businessAccounts.fields.accountNumber')}  
              required={true}
            />
           </Col>
           <Col span={24}>
             <Text>{i18n('entities.businessAccounts.fields.telephone')}</Text>
             <InputFormItem
              name="telephone"
              placeholder={i18n('entities.businessAccounts.fields.telephone')}  
              required={true}
            />
           </Col>
           <Col span={24}>
             <Text>{i18n('entities.businessAccounts.fields.currency')}</Text>
             <CurrencyAutocompleteFormItem  
              name="currency"
              placeholder={i18n('entities.businessAccounts.fields.currency')}
              required={false}
              showCreate={!props.modal}
            />
           </Col>
           <Col span={24}>
             <Text>{i18n('entities.businessAccounts.fields.isPrimary')}</Text>
             <SwitchFormItem
               name="isPrimary"
             />
           </Col>
         </Row>
          

          <Form.Item
            className="form-buttons"
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

export default BusinessAccountsForm;
