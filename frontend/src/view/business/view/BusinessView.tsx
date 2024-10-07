import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const BusinessView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.fullname) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.business.fields.fullname')}
        >
          {record.fullname}
        </Form.Item>
      )}

      {Boolean(record.businessName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.business.fields.businessName')}
        >
          {record.businessName}
        </Form.Item>
      )}

      {Boolean(record.email) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.business.fields.email')}
        >
          {record.email}
        </Form.Item>
      )}

      {Boolean(record.country) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.business.fields.country')}
        >
          {record.country}
        </Form.Item>
      )}

      {Boolean(record.password) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.business.fields.password')}
        >
          {record.password}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default BusinessView;
