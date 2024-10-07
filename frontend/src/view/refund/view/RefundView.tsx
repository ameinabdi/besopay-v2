import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import TransactionViewItem from 'src/view/transaction/view/TransactionViewItem';
import CustomerViewItem from 'src/view/customer/view/CustomerViewItem';

const RefundView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.transaction) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.refund.fields.transaction')}
          >
            <TransactionViewItem value={record.transaction} />
          </Form.Item>
        )}

      {(Boolean(record.transactionAmound) || record.transactionAmound === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.refund.fields.transactionAmound')}
          >
            {Number(record.transactionAmound).toFixed(2)}
          </Form.Item>
        )}

      {Boolean(record.refundType) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.refund.fields.refundType')}
        >
          {i18n(
            `entities.refund.enumerators.refundType.${record.refundType}`,
          )}
        </Form.Item>
      )}

      {Boolean(record.customerNote) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.refund.fields.customerNote')}
        >
          {record.customerNote}
        </Form.Item>
      )}

      {Boolean(record.businessNote) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.refund.fields.businessNote')}
        >
          {record.businessNote}
        </Form.Item>
      )}

      {Boolean(record.customer) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.refund.fields.customer')}
          >
            <CustomerViewItem value={record.customer} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default RefundView;
