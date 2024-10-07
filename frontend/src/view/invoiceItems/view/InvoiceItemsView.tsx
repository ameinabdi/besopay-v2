import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import InvoiceViewItem from 'src/view/invoice/view/InvoiceViewItem';

const InvoiceItemsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.invoice) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.invoiceItems.fields.invoice')}
          >
            <InvoiceViewItem value={record.invoice} />
          </Form.Item>
        )}

      {Boolean(record.item) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoiceItems.fields.item')}
        >
          {record.item}
        </Form.Item>
      )}

      {Boolean(record.quantity) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.invoiceItems.fields.quantity')}
        >
          {record.quantity}
        </Form.Item>
      )}

      {(Boolean(record.unitPrice) ||
        record.unitPrice === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.invoiceItems.fields.unitPrice')}
          >
            {record.unitPrice}
          </Form.Item>
        )}

      {(Boolean(record.totalAmount) ||
        record.totalAmount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.invoiceItems.fields.totalAmount')}
          >
            {record.totalAmount}
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default InvoiceItemsView;
