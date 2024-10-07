import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import StoreViewItem from 'src/view/store/view/StoreViewItem';

const ShippingView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.region) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.shipping.fields.region')}
        >
          {record.region}
        </Form.Item>
      )}

      {Boolean(record.currency) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.shipping.fields.currency')}
        >
          {record.currency}
        </Form.Item>
      )}

      {(Boolean(record.price) || record.price === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.shipping.fields.price')}
          >
            {Number(record.price).toFixed(2)}
          </Form.Item>
        )}

      {Boolean(record.store) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.shipping.fields.store')}
          >
            <StoreViewItem value={record.store} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default ShippingView;
