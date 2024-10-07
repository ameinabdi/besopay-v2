import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import CurrencyViewItem from 'src/view/currency/view/CurrencyViewItem';


const PaymentLinkView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.paymentLinkName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.paymentLinkName')}
        >
          {record.paymentLinkName}
        </Form.Item>
      )}

      {Boolean(record.currency) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.currency')}
        >
         <CurrencyViewItem value={record.currency} />
        </Form.Item>
      )}

      {(Boolean(record.amount) || record.amount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.paymentLink.fields.amount')}
          >
            {Number(record.amount).toFixed(2)}
          </Form.Item>
        )}

      {Boolean(record.description) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.description')}
        >
          {record.description}
        </Form.Item>
      )}

      {Boolean(record.customurl) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.customurl')}
        >
          {record.customurl}
        </Form.Item>
      )}

      {Boolean(record.redirecturl) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.redirecturl')}
        >
          {record.redirecturl}
        </Form.Item>
      )}

      {Boolean(record.typePaymentLink) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.typePaymentLink')}
        >
          {i18n(
            `entities.paymentLink.enumerators.typePaymentLink.${record.typePaymentLink}`,
          )}
        </Form.Item>
      )}

      {Boolean(record.interval) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.interval')}
        >
          {i18n(
            `entities.paymentLink.enumerators.interval.${record.interval}`,
          )}
        </Form.Item>
      )}

      {Boolean(record.numberOfTime) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.numberOfTime')}
        >
          {record.numberOfTime}
        </Form.Item>
      )}

      {Boolean(record.donationWebsite) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.donationWebsite')}
        >
          {record.donationWebsite}
        </Form.Item>
      )}

      {Boolean(record.donationTelephone) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.paymentLink.fields.donationTelephone')}
        >
          {record.donationTelephone}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default PaymentLinkView;
