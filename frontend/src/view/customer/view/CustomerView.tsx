import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const CustomerView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.fullname) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.customer.fields.fullname')}
        >
          {record.fullname}
        </Form.Item>
      )}

      {Boolean(record.email) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.customer.fields.email')}
        >
          {record.email}
        </Form.Item>
      )}

      {Boolean(record.telephone) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.customer.fields.telephone')}
        >
          {record.telephone}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default CustomerView;
