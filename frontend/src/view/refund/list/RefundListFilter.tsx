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
import actions from 'src/modules/refund/list/refundListActions';
import selectors from 'src/modules/refund/list/refundListSelectors';
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
import refundEnumerators from 'src/modules/refund/refundEnumerators';
import TransactionAutocompleteFormItem from 'src/view/transaction/autocomplete/TransactionAutocompleteFormItem';
import CustomerAutocompleteFormItem from 'src/view/customer/autocomplete/CustomerAutocompleteFormItem';

const schema = yup.object().shape({
  transaction: yupFilterSchemas.relationToOne(
    i18n('entities.refund.fields.transaction'),
  ),
  transactionAmoundRange: yupFilterSchemas.decimalRange(
    i18n('entities.refund.fields.transactionAmoundRange'),
  ),
  refundType: yupFilterSchemas.enumerator(
    i18n('entities.refund.fields.refundType'),
  ),
  customer: yupFilterSchemas.relationToOne(
    i18n('entities.refund.fields.customer'),
  ),
});

const emptyValues = {
  transaction: null,
  transactionAmoundRange: [],
  refundType: null,
  customer: null,
}

const previewRenders = {
  transaction: {
      label: i18n('entities.refund.fields.transaction'),
      render: filterRenders.relationToOne(),
    },
  transactionAmoundRange: {
    label: i18n('entities.refund.fields.transactionAmoundRange'),
    render: filterRenders.decimalRange(2),
  },
  refundType: {
    label: i18n('entities.refund.fields.refundType'),
    render: filterRenders.enumerator('entities.refund.enumerators.refundType',),
  },
  customer: {
      label: i18n('entities.refund.fields.customer'),
      render: filterRenders.relationToOne(),
    },
}

const RefundListFilter = (props) => {
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
                  <TransactionAutocompleteFormItem  
                    name="transaction"
                    label={i18n('entities.refund.fields.transaction')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="transactionAmoundRange"
                    label={i18n('entities.refund.fields.transactionAmoundRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="refundType"
                    label={i18n('entities.refund.fields.refundType')}
                    options={refundEnumerators.refundType.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.refund.enumerators.refundType.${value}`,
                        ),
                      }),
                    )}
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <CustomerAutocompleteFormItem  
                    name="customer"
                    label={i18n('entities.refund.fields.customer')}        
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

export default RefundListFilter;