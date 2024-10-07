import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import ImagesViewer from 'src/view/shared/ImagesViewer';
import BanksViewItem from 'src/view/banks/view/BanksViewItem';

const PaymentMethodView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.bankTypes) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.paymentMethod.fields.bankTypes')}
          >
            <BanksViewItem value={record.bankTypes} />
          </Form.Item>
        )}

      {Boolean(record.paymentMethodName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentMethod.fields.paymentMethodName')}
        >
          {record.paymentMethodName}
        </Form.Item>
      )}

      {Boolean(record.paymentMethodKey) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentMethod.fields.paymentMethodKey')}
        >
          {record.paymentMethodKey}
        </Form.Item>
      )}

      {Boolean(record.paymentMethodDescription) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentMethod.fields.paymentMethodDescription')}
        >
          {record.paymentMethodDescription}
        </Form.Item>
      )}

      {Boolean(record.paymentMethodLogo) && Boolean(record.paymentMethodLogo.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.paymentMethod.fields.paymentMethodLogo')}
          >
            <ImagesViewer value={record.paymentMethodLogo} />
          </Form.Item>
        )}

      {Boolean(record.paymentMethodThumbnail) && Boolean(record.paymentMethodThumbnail.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.paymentMethod.fields.paymentMethodThumbnail')}
          >
            <ImagesViewer value={record.paymentMethodThumbnail} />
          </Form.Item>
        )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.paymentMethod.fields.paymentMethodActive')}
      >
        {record.paymentMethodActive
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>
    </ViewWrapper>
  );
};

export default PaymentMethodView;
