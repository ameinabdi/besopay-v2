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
import actions from 'src/modules/banks/list/banksListActions';
import selectors from 'src/modules/banks/list/banksListSelectors';
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
import banksEnumerators from 'src/modules/banks/banksEnumerators';

const schema = yup.object().shape({
  bankname: yupFilterSchemas.string(
    i18n('entities.banks.fields.bankname'),
  ),
  banktelephone: yupFilterSchemas.string(
    i18n('entities.banks.fields.banktelephone'),
  ),
  bankemail: yupFilterSchemas.string(
    i18n('entities.banks.fields.bankemail'),
  ),
  bankaddress: yupFilterSchemas.string(
    i18n('entities.banks.fields.bankaddress'),
  ),
  keys: yupFilterSchemas.string(
    i18n('entities.banks.fields.keys'),
  ),
  bankTypes: yupFilterSchemas.enumerator(
    i18n('entities.banks.fields.bankTypes'),
  ),
});

const emptyValues = {
  bankname: null,
  banktelephone: null,
  bankemail: null,
  bankaddress: null,
  keys: null,
  bankTypes: null,
}

const previewRenders = {
  bankname: {
    label: i18n('entities.banks.fields.bankname'),
    render: filterRenders.generic(),
  },
  banktelephone: {
    label: i18n('entities.banks.fields.banktelephone'),
    render: filterRenders.generic(),
  },
  bankemail: {
    label: i18n('entities.banks.fields.bankemail'),
    render: filterRenders.generic(),
  },
  bankaddress: {
    label: i18n('entities.banks.fields.bankaddress'),
    render: filterRenders.generic(),
  },
  keys: {
    label: i18n('entities.banks.fields.keys'),
    render: filterRenders.generic(),
  },
  bankTypes: {
    label: i18n('entities.banks.fields.bankTypes'),
    render: filterRenders.enumerator('entities.banks.enumerators.bankTypes',),
  },
}

const BanksListFilter = (props) => {
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
                    name="bankname"
                    label={i18n('entities.banks.fields.bankname')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="banktelephone"
                    label={i18n('entities.banks.fields.banktelephone')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="bankemail"
                    label={i18n('entities.banks.fields.bankemail')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="bankaddress"
                    label={i18n('entities.banks.fields.bankaddress')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="keys"
                    label={i18n('entities.banks.fields.keys')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="bankTypes"
                    label={i18n('entities.banks.fields.bankTypes')}
                    options={banksEnumerators.bankTypes.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.banks.enumerators.bankTypes.${value}`,
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

export default BanksListFilter;