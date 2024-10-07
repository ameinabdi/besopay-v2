import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import PaymentMethodViewItem from 'src/view/paymentMethod/view/PaymentMethodViewItem';
import CustomerViewItem from 'src/view/customer/view/CustomerViewItem';
import CurrencyViewItem from 'src/view/currency/view/CurrencyViewItem';
import JsonHighlighter from 'src/view/shared/JsonHighlighter';

const TransactionView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.status) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.transaction.fields.status')}
        >
          {i18n(
            `entities.transaction.enumerators.status.${record.status}`,
          )}
        </Form.Item>
      )}

      {Boolean(record.paymentMethod) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.transaction.fields.paymentMethod')}
          >
            <PaymentMethodViewItem value={record.paymentMethod} />
          </Form.Item>
        )}

      {(Boolean(record.amount) || record.amount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.transaction.fields.amount')}
          >
            {Number(record.amount).toFixed(3)}
          </Form.Item>
        )}

      {Boolean(record.customer) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.transaction.fields.customer')}
          >
            <CustomerViewItem value={record.customer} />
          </Form.Item>
        )}

      {Boolean(record.reference) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.transaction.fields.reference')}
        >
          {record.reference}
        </Form.Item>
      )}

      {Boolean(record.currency) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.transaction.fields.currency')}
          >
            <CurrencyViewItem value={record.currency} />
          </Form.Item>
        )}

      {Boolean(record.paymentType) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.transaction.fields.paymentType')}
        >
          {i18n(
            `entities.transaction.enumerators.paymentType.${record.paymentType}`,
          )}
        </Form.Item>
      )}
      {Boolean(record.transactionLog) && (
        <Form.Item
          {...viewItemLayout}
          label={'Logs'}
        >
          {record.transactionLog?.map((log)=>(
              <JsonHighlighter code={log.values} />
          ))}
        </Form.Item>
      )}
     
    </ViewWrapper>
  );
};

export default TransactionView;
