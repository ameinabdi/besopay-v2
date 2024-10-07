import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import BanksViewItem from 'src/view/banks/view/BanksViewItem';
import CurrencyViewItem from 'src/view/currency/view/CurrencyViewItem';

const BusinessAccountsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.bankType) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.businessAccounts.fields.bankType')}
          >
            <BanksViewItem value={record.bankType} />
          </Form.Item>
        )}

      {Boolean(record.accountName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.businessAccounts.fields.accountName')}
        >
          {record.accountName}
        </Form.Item>
      )}

      {Boolean(record.accountNumber) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.businessAccounts.fields.accountNumber')}
        >
          {record.accountNumber}
        </Form.Item>
      )}

      {Boolean(record.telephone) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.businessAccounts.fields.telephone')}
        >
          {record.telephone}
        </Form.Item>
      )}

      {Boolean(record.currency) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.businessAccounts.fields.currency')}
          >
            <CurrencyViewItem value={record.currency} />
          </Form.Item>
        )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.businessAccounts.fields.isPrimary')}
      >
        {record.isPrimary
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>
    </ViewWrapper>
  );
};

export default BusinessAccountsView;
