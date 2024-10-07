import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const CurrencyView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.currency) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.currency.fields.currency')}
        >
          {record.currency}
        </Form.Item>
      )}

      {Boolean(record.currencyIso) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.currency.fields.currencyIso')}
        >
          {record.currencyIso}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default CurrencyView;
