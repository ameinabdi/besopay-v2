import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const LocationsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.city) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.locations.fields.city')}
        >
          {record.city}
        </Form.Item>
      )}

      {Boolean(record.state) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.locations.fields.state')}
        >
          {record.state}
        </Form.Item>
      )}

      {Boolean(record.country) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.locations.fields.country')}
        >
          {record.country}
        </Form.Item>
      )}

      {Boolean(record.streetAddress) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.locations.fields.streetAddress')}
        >
          {record.streetAddress}
        </Form.Item>
      )}

      {Boolean(record.type) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.locations.fields.type')}
        >
          {i18n(
            `entities.locations.enumerators.type.${record.type}`,
          )}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default LocationsView;
