import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import CustomerViewItem from 'src/view/customer/view/CustomerViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';
import PaymentLinkViewItem from 'src/view/paymentLink/view/PaymentLinkViewItem';
import InvoiceViewItem from 'src/view/invoice/view/InvoiceViewItem';
import PaymentMethodViewItem from 'src/view/paymentMethod/view/PaymentMethodViewItem';
import CurrencyViewItem from 'src/view/currency/view/CurrencyViewItem';

const PaymentView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.customer) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.customer')}
          >
            <CustomerViewItem value={record.customer} />
          </Form.Item>
        )}

      {Boolean(record.paymentType) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.payment.fields.paymentType')}
        >
          {i18n(
            `entities.payment.enumerators.paymentType.${record.paymentType}`,
          )}
        </Form.Item>
      )}

      {Boolean(record.product) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.product')}
          >
            <ProductViewItem value={record.product} />
          </Form.Item>
        )}

      {Boolean(record.paymentLink) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.paymentLink')}
          >
            <PaymentLinkViewItem value={record.paymentLink} />
          </Form.Item>
        )}

      {Boolean(record.invoice) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.invoice')}
          >
            <InvoiceViewItem value={record.invoice} />
          </Form.Item>
        )}

      {Boolean(record.paymentMethod) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.paymentMethod')}
          >
            <PaymentMethodViewItem value={record.paymentMethod} />
          </Form.Item>
        )}

      {(Boolean(record.amount) || record.amount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.amount')}
          >
            {Number(record.amount).toFixed(4)}
          </Form.Item>
        )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.payment.fields.paid')}
      >
        {record.paid
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>

      {Boolean(record.currency) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.payment.fields.currency')}
          >
            <CurrencyViewItem value={record.currency} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default PaymentView;
