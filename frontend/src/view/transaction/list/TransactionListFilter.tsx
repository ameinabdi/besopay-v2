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
import actions from 'src/modules/transaction/list/transactionListActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';
import PaymentMethodAutocompleteFormItem from 'src/view/paymentMethod/autocomplete/PaymentMethodAutocompleteFormItem';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';
import CurrencyAutocompleteFormItem from 'src/view/currency/autocomplete/CurrencyAutocompleteFormItem';

const schema = yup.object().shape({
  status: yupFilterSchemas.enumerator(
    i18n('entities.transaction.fields.status'),
  ),
  paymentMethod: yupFilterSchemas.relationToOne(
    i18n('entities.transaction.fields.paymentMethod'),
  ),
  amountRange: yupFilterSchemas.decimalRange(
    i18n('entities.transaction.fields.amountRange'),
  ),
  customer: yupFilterSchemas.relationToOne(
    i18n('entities.transaction.fields.customer'),
  ),
  reference: yupFilterSchemas.string(
    i18n('entities.transaction.fields.reference'),
  ),
  currency: yupFilterSchemas.relationToOne(
    i18n('entities.transaction.fields.currency'),
  ),
  paymentType: yupFilterSchemas.enumerator(
    i18n('entities.transaction.fields.paymentType'),
  ),
});

const emptyValues = {
  status: null,
  paymentMethod: null,
  amountRange: [],
  customer: null,
  reference: null,
  currency: null,
  paymentType: null,
}

const previewRenders = {
  status: {
    label: i18n('entities.transaction.fields.status'),
    render: filterRenders.enumerator('entities.transaction.enumerators.status',),
  },
  paymentMethod: {
      label: i18n('entities.transaction.fields.paymentMethod'),
      render: filterRenders.relationToOne(),
    },
  customer: {
      label: i18n('entities.transaction.fields.customer'),
      render: filterRenders.relationToOne(),
    },
  reference: {
    label: i18n('entities.transaction.fields.reference'),
    render: filterRenders.generic(),
  },
  currency: {
      label: i18n('entities.transaction.fields.currency'),
      render: filterRenders.relationToOne(),
    },
  paymentType: {
    label: i18n('entities.transaction.fields.paymentType'),
    render: filterRenders.enumerator('entities.transaction.enumerators.paymentType',),
  },
}

const TransactionListFilter = (props) => {
 const dispatch = useAppDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(true);

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
    setExpanded(true);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(true);
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
              <Col xs={24} md={6} lg={4}>
                  <SelectFormItem
                    name="paymentType"
                    label={i18n('entities.transaction.fields.paymentType')}
                    options={transactionEnumerators.paymentType.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.transaction.enumerators.paymentType.${value}`,
                        ),
                      }),
                    )}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={6} lg={4}>
                  <SelectFormItem
                    name="status"
                    label={i18n('entities.transaction.fields.status')}
                    options={transactionEnumerators.status.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.transaction.enumerators.status.${value}`,
                        ),
                      }),
                    )}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={6} lg={4}>
                  <PaymentMethodAutocompleteFormItem  
                    name="paymentMethod"
                    label={i18n('entities.transaction.fields.paymentMethod')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={6} lg={4}>
                  <CustomerAutocompleteFormItem  
                    name="customer"
                    label={i18n('entities.transaction.fields.customer')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={6} lg={4}>
                  <InputFormItem
                    name="reference"
                    label={i18n('entities.transaction.fields.reference')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={6} lg={4}>
                  <CurrencyAutocompleteFormItem  
                    name="currency"
                    label={i18n('entities.transaction.fields.currency')}        
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

export default TransactionListFilter;