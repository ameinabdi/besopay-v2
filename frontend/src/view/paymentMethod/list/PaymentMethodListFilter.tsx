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
import actions from 'src/modules/paymentMethod/list/paymentMethodListActions';
import selectors from 'src/modules/paymentMethod/list/paymentMethodListSelectors';
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
import BanksAutocompleteFormItem from 'src/view/banks/autocomplete/BanksAutocompleteFormItem';

const schema = yup.object().shape({
  bankTypes: yupFilterSchemas.relationToOne(
    i18n('entities.paymentMethod.fields.bankTypes'),
  ),
  paymentMethodName: yupFilterSchemas.string(
    i18n('entities.paymentMethod.fields.paymentMethodName'),
  ),
  paymentMethodKey: yupFilterSchemas.string(
    i18n('entities.paymentMethod.fields.paymentMethodKey'),
  ),
  paymentMethodDescription: yupFilterSchemas.string(
    i18n('entities.paymentMethod.fields.paymentMethodDescription'),
  ),
  paymentMethodActive: yupFilterSchemas.boolean(
    i18n('entities.paymentMethod.fields.paymentMethodActive'),
  ),
});

const emptyValues = {
  bankTypes: null,
  paymentMethodName: null,
  paymentMethodKey: null,
  paymentMethodDescription: null,
  paymentMethodActive: null,
}

const previewRenders = {
  bankTypes: {
      label: i18n('entities.paymentMethod.fields.bankTypes'),
      render: filterRenders.relationToOne(),
    },
  paymentMethodName: {
    label: i18n('entities.paymentMethod.fields.paymentMethodName'),
    render: filterRenders.generic(),
  },
  paymentMethodKey: {
    label: i18n('entities.paymentMethod.fields.paymentMethodKey'),
    render: filterRenders.generic(),
  },
  paymentMethodDescription: {
    label: i18n('entities.paymentMethod.fields.paymentMethodDescription'),
    render: filterRenders.generic(),
  },
  paymentMethodActive: {
    label: i18n('entities.paymentMethod.fields.paymentMethodActive'),
    render: filterRenders.boolean(),
  },
}

const PaymentMethodListFilter = (props) => {
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
                  <BanksAutocompleteFormItem  
                    name="bankTypes"
                    label={i18n('entities.paymentMethod.fields.bankTypes')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="paymentMethodName"
                    label={i18n('entities.paymentMethod.fields.paymentMethodName')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="paymentMethodKey"
                    label={i18n('entities.paymentMethod.fields.paymentMethodKey')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="paymentMethodDescription"
                    label={i18n('entities.paymentMethod.fields.paymentMethodDescription')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="paymentMethodActive"
                    label={i18n('entities.paymentMethod.fields.paymentMethodActive')}
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

export default PaymentMethodListFilter;