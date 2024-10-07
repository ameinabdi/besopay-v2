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
import actions from 'src/modules/product/list/productListActions';
import selectors from 'src/modules/product/list/productListSelectors';
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
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';

const schema = yup.object().shape({
  productName: yupFilterSchemas.string(
    i18n('entities.product.fields.productName'),
  ),
  productDescription: yupFilterSchemas.string(
    i18n('entities.product.fields.productDescription'),
  ),
  priceRange: yupFilterSchemas.decimalRange(
    i18n('entities.product.fields.priceRange'),
  ),
  sellingPriceRange: yupFilterSchemas.decimalRange(
    i18n('entities.product.fields.sellingPriceRange'),
  ),
  stockUnitRange: yupFilterSchemas.integerRange(
    i18n('entities.product.fields.stockUnitRange'),
  ),
  category: yupFilterSchemas.relationToOne(
    i18n('entities.product.fields.category'),
  ),
});

const emptyValues = {
  productName: null,
  productDescription: null,
  priceRange: [],
  sellingPriceRange: [],
  stockUnitRange: [],
  category: null,
}

const previewRenders = {
  productName: {
    label: i18n('entities.product.fields.productName'),
    render: filterRenders.generic(),
  },
  productDescription: {
    label: i18n('entities.product.fields.productDescription'),
    render: filterRenders.generic(),
  },
  priceRange: {
    label: i18n('entities.product.fields.priceRange'),
    render: filterRenders.decimalRange(2),
  },
  sellingPriceRange: {
    label: i18n('entities.product.fields.sellingPriceRange'),
    render: filterRenders.decimalRange(2),
  },
  stockUnitRange: {
    label: i18n('entities.product.fields.stockUnitRange'),
    render: filterRenders.range(),
  },
  category: {
      label: i18n('entities.product.fields.category'),
      render: filterRenders.relationToOne(),
    },
}

const ProductListFilter = (props) => {
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
                  <InputFormItem
                    name="productName"
                    label={i18n('entities.product.fields.productName')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="productDescription"
                    label={i18n('entities.product.fields.productDescription')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="priceRange"
                    label={i18n('entities.product.fields.priceRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputRangeFormItem
                    name="sellingPriceRange"
                    label={i18n('entities.product.fields.sellingPriceRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputNumberRangeFormItem
                    name="stockUnitRange"
                    label={i18n('entities.product.fields.stockUnitRange')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <ProductCategoryAutocompleteFormItem  
                    name="category"
                    label={i18n('entities.product.fields.category')}        
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

export default ProductListFilter;