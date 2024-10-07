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
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import paymentLinkEnumerators from 'src/modules/paymentLink/paymentLinkEnumerators';
import CurrencyInputFormItem from 'src/view/shared/form/items/InputFormItem';
import UrlInputFormItem from 'src/view/shared/form/items/InputFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';
const { Text } = Typography


const schema = yup.object().shape({
  paymentLinkName: yupFormSchemas.string(
    i18n('entities.paymentLink.fields.paymentLinkName'),
    {
      "required": true
    },
  ),
  currency: yupFormSchemas.relationToOne(
    i18n('entities.paymentLink.fields.currency'),
    {},
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.paymentLink.fields.amount'),
    {
      "scale": 2
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.paymentLink.fields.description'),
    {},
  ),
  customurl: yupFormSchemas.string(
    i18n('entities.paymentLink.fields.customurl'),
    {},
  ),
  redirecturl: yupFormSchemas.string(
    i18n('entities.paymentLink.fields.redirecturl'),
    {},
  ),
  typePaymentLink: yupFormSchemas.enumerator(
    i18n('entities.paymentLink.fields.typePaymentLink'),
    {
      "options": paymentLinkEnumerators.typePaymentLink
    },
  ),
  interval: yupFormSchemas.enumerator(
    i18n('entities.paymentLink.fields.interval'),
    {
      "options": paymentLinkEnumerators.interval
    },
  ),
  numberOfTime: yupFormSchemas.integer(
    i18n('entities.paymentLink.fields.numberOfTime'),
    {},
  ),
  donationWebsite: yupFormSchemas.string(
    i18n('entities.paymentLink.fields.donationWebsite'),
    {},
  ),
  donationTelephone: yupFormSchemas.string(
    i18n('entities.paymentLink.fields.donationTelephone'),
    {},
  ),
});

const PaymentLinkForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      paymentLinkName: record.paymentLinkName,
      currency: record.currency,
      amount: record.amount,
      description: record.description,
      customurl: record.customurl,
      redirecturl: record.redirecturl,
      typePaymentLink: record.typePaymentLink,
      interval: record.interval,
      numberOfTime: record.numberOfTime,
      donationWebsite: record.donationWebsite,
      donationTelephone: record.donationTelephone,
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
          <Text>{i18n('entities.paymentLink.fields.typePaymentLink')}</Text>
          <SelectFormItem
            name="typePaymentLink"
            options={paymentLinkEnumerators.typePaymentLink.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.paymentLink.enumerators.typePaymentLink.${value}`,
                ),
              }),
            )}
            required={false}
            size="large"
            layout={null}
            autoFocus
          />
    </Col>
        </Row>
        <Row>
         <Col span={24}>
          <Text>{i18n('entities.paymentLink.fields.paymentLinkName')}</Text>
          <InputFormItem
            name="paymentLinkName"
            required={true}
            layout={null}
            size="large"

          />
    </Col>
        </Row>
        <Row>
         <Col span={4}>
         <Text>{i18n('entities.paymentLink.fields.currency')}</Text>
         <CurrencyAutocompleteFormItem
          name="currency"
          required={false}
          layout={null}
          size="large"
         />
         </Col>
         <Col span={20}>
          <Text>{i18n('entities.paymentLink.fields.amount')}</Text>
          <CurrencyInputFormItem
            name="amount"
            required={false}
            layout={null}
            size="large"

          />
    </Col>
        </Row>
        <Row>
         <Col span={24}>
          <Text>{i18n('entities.paymentLink.fields.description')}</Text>
          <TextAreaFormItem
            name="description"
            required={false}
            layout={null}
          />
    </Col>
        </Row>
        <Row>
         <Col span={24}>
          <Text>{i18n('entities.paymentLink.fields.redirecturl')}</Text>
          <UrlInputFormItem
            name="redirecturl"
            required={false}
            layout={null}
            size="large"

          />
    </Col>
        </Row>
        <Row>
         <Col span={24}>
          <Text>{i18n('entities.paymentLink.fields.interval')}</Text>
          <SelectFormItem
            name="interval"
            options={paymentLinkEnumerators.interval.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.paymentLink.enumerators.interval.${value}`,
                ),
              }),
            )}
            required={false}
            layout={null}
            size="large"

          />
    </Col>
        </Row>
        <Row>
         <Col span={24}>
          <Text>{i18n('entities.paymentLink.fields.numberOfTime')}  </Text>
          <InputNumberFormItem
            name="numberOfTime"
            required={false}
            layout={null}
            size="large"

          />
    </Col>
        </Row>
        {form.watch('typePaymentLink') === 'Donation' ?
        <Row>
          <Col span={24}>
            <Text>{i18n('entities.paymentLink.fields.donationWebsite')}</Text>
            <InputFormItem
              name="donationWebsite"
              required={false}
              layout={null}
              size="large"

            />
            </Col>
          </Row>
          :
           null
        }
        {form.watch('typePaymentLink') === 'Donation' ?
            <Row>
              <Col span={24}>
              <Text>{i18n('entities.paymentLink.fields.donationTelephone')}</Text>
              <InputFormItem
                name="donationTelephone"
                required={false}
                layout={null}
                size="large"
    
              />
             </Col>
           </Row>
          :
           null
        }
        
          <Form.Item
            className="form-buttons"
            // {...tailFormItemLayout}
          >
            <Row>
              <Col span={8}>
              <Button
                loading={saveLoading}
                type="primary"
                onClick={form.handleSubmit(onSubmit)}
                icon={<SaveOutlined />}
                size='large'
                block
              >
                {i18n('common.save')}
              </Button>
              </Col>
              <Col span={7} style={{marginLeft:10, marginRight:10}}>
              <Button
                disabled={saveLoading}
                onClick={onReset}
                icon={<UndoOutlined />}
                size='large'
                block
              >
                {i18n('common.reset')}
              </Button>
              </Col>
              <Col span={8}>
               {props.onCancel && (
                  <Button
                    disabled={saveLoading}
                    onClick={() => props.onCancel()}
                    icon={<CloseOutlined />}
                    size='large'
                    block
                  >
                    {i18n('common.cancel')}
                  </Button>
                )}
              </Col>
            </Row>
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default PaymentLinkForm;
