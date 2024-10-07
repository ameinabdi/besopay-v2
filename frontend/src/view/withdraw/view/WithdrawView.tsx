import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import moment from 'moment';
import BusinessAccountsViewItem from 'src/view/businessAccounts/view/BusinessAccountsViewItem';

const WithdrawView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.bankAccount) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.withdraw.fields.bankAccount')}
          >
            <BusinessAccountsViewItem value={record.bankAccount} />
          </Form.Item>
        )}

      {(Boolean(record.amount) || record.amount === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.withdraw.fields.amount')}
          >
            {Number(record.amount).toFixed(4)}
          </Form.Item>
        )}

      {Boolean(record.description) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.withdraw.fields.description')}
        >
          {record.description}
        </Form.Item>
      )}

      {Boolean(record.paid) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n(
            'entities.withdraw.fields.paid',
          )}
        >
          <>
            {moment(record.paid).format(
              'YYYY-MM-DD HH:mm',
            )}
          </>
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default WithdrawView;
