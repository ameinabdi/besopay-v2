import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import CustomerViewItem from 'src/view/customer/view/CustomerViewItem';

const InvoiceView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.customer) && Boolean(record.customer.length) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoice.fields.customer')}
        >
          <CustomerViewItem value={record.customer} />
        </Form.Item>
      )}

      {Boolean(record.dueDate) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoice.fields.dueDate')}
        >
          {record.dueDate}
        </Form.Item>
      )}

      {Boolean(record.currency) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoice.fields.currency')}
        >
          {record.currency}
        </Form.Item>
      )}

      {Boolean(record.invoiceNote) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoice.fields.invoiceNote')}
        >
          {record.invoiceNote}
        </Form.Item>
      )}

      {(Boolean(record.shippingFee) || record.shippingFee === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.invoice.fields.shippingFee')}
          >
            {Number(record.shippingFee).toFixed(2)}
          </Form.Item>
        )}

      {(Boolean(record.discount) || record.discount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.invoice.fields.discount')}
          >
            {Number(record.discount).toFixed(2)}
          </Form.Item>
        )}

      {(Boolean(record.tax) || record.tax === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.invoice.fields.tax')}
          >
            {Number(record.tax).toFixed(2)}
          </Form.Item>
        )}

      {Boolean(record.otherEmails) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoice.fields.otherEmails')}
        >
          {record.otherEmails}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default InvoiceView;
