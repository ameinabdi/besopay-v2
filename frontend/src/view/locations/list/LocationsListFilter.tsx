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
import actions from 'src/modules/locations/list/locationsListActions';
import selectors from 'src/modules/locations/list/locationsListSelectors';
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
import locationsEnumerators from 'src/modules/locations/locationsEnumerators';

const schema = yup.object().shape({
  city: yupFilterSchemas.string(
    i18n('entities.locations.fields.city'),
  ),
  state: yupFilterSchemas.string(
    i18n('entities.locations.fields.state'),
  ),
  country: yupFilterSchemas.string(
    i18n('entities.locations.fields.country'),
  ),
  streetAddress: yupFilterSchemas.string(
    i18n('entities.locations.fields.streetAddress'),
  ),
  type: yupFilterSchemas.enumerator(
    i18n('entities.locations.fields.type'),
  ),
});

const emptyValues = {
  city: null,
  state: null,
  country: null,
  streetAddress: null,
  type: null,
}

const previewRenders = {
  city: {
    label: i18n('entities.locations.fields.city'),
    render: filterRenders.generic(),
  },
  state: {
    label: i18n('entities.locations.fields.state'),
    render: filterRenders.generic(),
  },
  country: {
    label: i18n('entities.locations.fields.country'),
    render: filterRenders.generic(),
  },
  streetAddress: {
    label: i18n('entities.locations.fields.streetAddress'),
    render: filterRenders.generic(),
  },
  type: {
    label: i18n('entities.locations.fields.type'),
    render: filterRenders.enumerator('entities.locations.enumerators.type',),
  },
}

const LocationsListFilter = (props) => {
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
                    name="city"
                    label={i18n('entities.locations.fields.city')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="state"
                    label={i18n('entities.locations.fields.state')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="country"
                    label={i18n('entities.locations.fields.country')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="streetAddress"
                    label={i18n('entities.locations.fields.streetAddress')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <SelectFormItem
                    name="type"
                    label={i18n('entities.locations.fields.type')}
                    options={locationsEnumerators.type.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.locations.enumerators.type.${value}`,
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

export default LocationsListFilter;