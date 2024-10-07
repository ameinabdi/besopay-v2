import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import actions from 'src/modules/payment/list/paymentListActions';
import selectors from 'src/modules/payment/list/paymentListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputRangeFormItem from 'src/view/shared/form/items/InputRangeFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import paymentEnumerators from 'src/modules/payment/paymentEnumerators';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';
import ProductAutocompleteFormItem from 'src/view/product/autocomplete/ProductAutocompleteFormItem';
import PaymentLinkAutocompleteFormItem from 'src/view/paymentLink/autocomplete/PaymentLinkAutocompleteFormItem';
import InvoiceAutocompleteFormItem from 'src/view/invoice/autocomplete/InvoiceAutocompleteFormItem';
import PaymentMethodAutocompleteFormItem from 'src/view/paymentMethod/autocomplete/PaymentMethodAutocompleteFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';

const schema = yup.object().shape({
  customer: yupFilterSchemas.relationToOne(
    i18n('entities.payment.fields.customer'),
  ),
  paymentType: yupFilterSchemas.enumerator(
    i18n('entities.payment.fields.paymentType'),
  ),
  product: yupFilterSchemas.relationToOne(
    i18n('entities.payment.fields.product'),
  ),
  paymentLink: yupFilterSchemas.relationToOne(
    i18n('entities.payment.fields.paymentLink'),
  ),
  invoice: yupFilterSchemas.relationToOne(
    i18n('entities.payment.fields.invoice'),
  ),
  paymentMethod: yupFilterSchemas.relationToOne(
    i18n('entities.payment.fields.paymentMethod'),
  ),
  amountRange: yupFilterSchemas.decimalRange(
    i18n('entities.payment.fields.amountRange'),
  ),
  paid: yupFilterSchemas.boolean(
    i18n('entities.payment.fields.paid'),
  ),
  currency: yupFilterSchemas.relationToOne(
    i18n('entities.payment.fields.currency'),
  ),
});

const emptyValues = {
  customer: null,
  paymentType: null,
  product: null,
  paymentLink: null,
  invoice: null,
  paymentMethod: null,
  amountRange: [],
  paid: null,
  currency: null,
}

const previewRenders = {
  customer: {
      label: i18n('entities.payment.fields.customer'),
      render: filterRenders.relationToOne(),
    },
  paymentType: {
    label: i18n('entities.payment.fields.paymentType'),
    render: filterRenders.enumerator('entities.payment.enumerators.paymentType',),
  },
  product: {
      label: i18n('entities.payment.fields.product'),
      render: filterRenders.relationToOne(),
    },
  paymentLink: {
      label: i18n('entities.payment.fields.paymentLink'),
      render: filterRenders.relationToOne(),
    },
  invoice: {
      label: i18n('entities.payment.fields.invoice'),
      render: filterRenders.relationToOne(),
    },
  paymentMethod: {
      label: i18n('entities.payment.fields.paymentMethod'),
      render: filterRenders.relationToOne(),
    },
  amountRange: {
    label: i18n('entities.payment.fields.amountRange'),
    render: filterRenders.decimalRange(4),
  },
  paid: {
    label: i18n('entities.payment.fields.paid'),
    render: filterRenders.boolean(),
  },
  currency: {
      label: i18n('entities.payment.fields.currency'),
      render: filterRenders.relationToOne(),
    },
}

const PaymentListFilter = (props) => {
 const dispatch = useAppDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;
  return (
    <FilterWrapper>
      <Collapse
        activeKey={expanded ? 'filter' : undefined}
        expandIconPosition="right"
        ghost
        onChange={(value) => {
          setExpanded(Boolean(value.length));
        }}
      >
        <Collapse.Panel
          header={
            <FilterPreview             
              renders={previewRenders}
              values={rawFilter}
              expanded={expanded}
              onRemove={onRemove}
            />
          }
          key="filter"
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Row gutter={24}>
                <Col xs={24} md={24} lg={12}>
                  <CustomerAutocompleteFormItem  
                    name="customer"
                    label={i18n('entities.payment.fields.customer')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="paymentType"
                    label={i18n('entities.payment.fields.paymentType')}
                    options={paymentEnumerators.paymentType.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.payment.enumerators.paymentType.${value}`,
                        ),
                      }),
                    )}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <ProductAutocompleteFormItem  
                    name="product"
                    label={i18n('entities.payment.fields.product')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <PaymentLinkAutocompleteFormItem  
                    name="paymentLink"
                    label={i18n('entities.payment.fields.paymentLink')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InvoiceAutocompleteFormItem  
                    name="invoice"
                    label={i18n('entities.payment.fields.invoice')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <PaymentMethodAutocompleteFormItem  
                    name="paymentMethod"
                    label={i18n('entities.payment.fields.paymentMethod')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="amountRange"
                    label={i18n('entities.payment.fields.amountRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="paid"
                    label={i18n('entities.payment.fields.paid')}
                    options={[
                      {
                        value: true,
                        label: i18n('common.yes'),
                      },
                      {
                        value: false,
                        label: i18n('common.no'),
                      },
                    ]}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <CurrencyAutocompleteFormItem  
                    name="currency"
                    label={i18n('entities.payment.fields.currency')}        
                    layout={filterItemLayout}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="filter-buttons" span={24}>
                  <Button
                    loading={loading}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    {i18n('common.search')}
                  </Button>
                  <Button
                    loading={loading}
                    onClick={onReset}
                    icon={<UndoOutlined />}
                  >
                    {i18n('common.reset')}
                  </Button>
                </Col>
              </Row>
            </form>
          </FormProvider>
        </Collapse.Panel>
      </Collapse>
    </FilterWrapper>
  );
};

export default PaymentListFilter;