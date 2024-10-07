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
import actions from 'src/modules/paymentLink/list/paymentLinkListActions';
import selectors from 'src/modules/paymentLink/list/paymentLinkListSelectors';
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
import paymentLinkEnumerators from 'src/modules/paymentLink/paymentLinkEnumerators';

const schema = yup.object().shape({
  paymentLinkName: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.paymentLinkName'),
  ),
  currency: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.currency'),
  ),
  amountRange: yupFilterSchemas.decimalRange(
    i18n('entities.paymentLink.fields.amountRange'),
  ),
  description: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.description'),
  ),
  customurl: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.customurl'),
  ),
  redirecturl: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.redirecturl'),
  ),
  typePaymentLink: yupFilterSchemas.enumerator(
    i18n('entities.paymentLink.fields.typePaymentLink'),
  ),
  interval: yupFilterSchemas.enumerator(
    i18n('entities.paymentLink.fields.interval'),
  ),
  numberOfTimeRange: yupFilterSchemas.integerRange(
    i18n('entities.paymentLink.fields.numberOfTimeRange'),
  ),
  donationWebsite: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.donationWebsite'),
  ),
  donationTelephone: yupFilterSchemas.string(
    i18n('entities.paymentLink.fields.donationTelephone'),
  ),
});

const emptyValues = {
  paymentLinkName: null,
  currency: null,
  amountRange: [],
  description: null,
  customurl: null,
  redirecturl: null,
  typePaymentLink: null,
  interval: null,
  numberOfTimeRange: [],
  donationWebsite: null,
  donationTelephone: null,
}

const previewRenders = {
  paymentLinkName: {
    label: i18n('entities.paymentLink.fields.paymentLinkName'),
    render: filterRenders.generic(),
  },
  currency: {
    label: i18n('entities.paymentLink.fields.currency'),
    render: filterRenders.generic(),
  },
  typePaymentLink: {
    label: i18n('entities.paymentLink.fields.typePaymentLink'),
    render: filterRenders.enumerator('entities.paymentLink.enumerators.typePaymentLink',),
  },
  
}

const PaymentLinkListFilter = (props) => {
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
                <Col xs={24} md={24} lg={8}>
                  <InputFormItem
                    name="paymentLinkName"
                    label={i18n('entities.paymentLink.fields.paymentLinkName')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <InputFormItem
                    name="currency"
                    label={i18n('entities.paymentLink.fields.currency')}      
                    layout={filterItemLayout}
                  />
                </Col>
                
                <Col xs={24} md={24} lg={8}>
                  <SelectFormItem
                    name="typePaymentLink"
                    label={i18n('entities.paymentLink.fields.typePaymentLink')}
                    options={paymentLinkEnumerators.typePaymentLink.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.paymentLink.enumerators.typePaymentLink.${value}`,
                        ),
                      }),
                    )}
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

export default PaymentLinkListFilter;