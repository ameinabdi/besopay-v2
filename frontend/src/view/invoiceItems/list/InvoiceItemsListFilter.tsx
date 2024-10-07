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
import actions from 'src/modules/invoiceItems/list/invoiceItemsListActions';
import selectors from 'src/modules/invoiceItems/list/invoiceItemsListSelectors';
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
import InputRangeFormItem from 'src/view/shared/form/items/InputRangeFormItem';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import InvoiceAutocompleteFormItem from 'src/view/invoice/autocomplete/InvoiceAutocompleteFormItem';

const schema = yup.object().shape({
  invoice: yupFilterSchemas.relationToOne(
    i18n('entities.invoiceItems.fields.invoice'),
  ),
  item: yupFilterSchemas.string(
    i18n('entities.invoiceItems.fields.item'),
  ),
  quantityRange: yupFilterSchemas.integerRange(
    i18n('entities.invoiceItems.fields.quantityRange'),
  ),
  unitPriceRange: yupFilterSchemas.decimalRange(
    i18n('entities.invoiceItems.fields.unitPriceRange'),
  ),
  totalAmountRange: yupFilterSchemas.decimalRange(
    i18n('entities.invoiceItems.fields.totalAmountRange'),
  ),
});

const emptyValues = {
  invoice: null,
  item: null,
  quantityRange: [],
  unitPriceRange: [],
  totalAmountRange: [],
}

const previewRenders = {
  invoice: {
      label: i18n('entities.invoiceItems.fields.invoice'),
      render: filterRenders.relationToOne(),
    },
  item: {
    label: i18n('entities.invoiceItems.fields.item'),
    render: filterRenders.generic(),
  },
  quantityRange: {
    label: i18n('entities.invoiceItems.fields.quantityRange'),
    render: filterRenders.range(),
  },
  unitPriceRange: {
    label: i18n('entities.invoiceItems.fields.unitPriceRange'),
    render: filterRenders.decimalRange(),
  },
  totalAmountRange: {
    label: i18n('entities.invoiceItems.fields.totalAmountRange'),
    render: filterRenders.decimalRange(),
  },
}

const InvoiceItemsListFilter = (props) => {
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
                  <InvoiceAutocompleteFormItem  
                    name="invoice"
                    label={i18n('entities.invoiceItems.fields.invoice')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="item"
                    label={i18n('entities.invoiceItems.fields.item')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputNumberRangeFormItem
                    name="quantityRange"
                    label={i18n('entities.invoiceItems.fields.quantityRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="unitPriceRange"
                    label={i18n('entities.invoiceItems.fields.unitPriceRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="totalAmountRange"
                    label={i18n('entities.invoiceItems.fields.totalAmountRange')}      
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

export default InvoiceItemsListFilter;