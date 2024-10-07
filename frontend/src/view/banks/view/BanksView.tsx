import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const BanksView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.bankname) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.banks.fields.bankname')}
        >
          {record.bankname}
        </Form.Item>
      )}

      {Boolean(record.banktelephone) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.banks.fields.banktelephone')}
        >
          {record.banktelephone}
        </Form.Item>
      )}

      {Boolean(record.bankemail) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.banks.fields.bankemail')}
        >
          {record.bankemail}
        </Form.Item>
      )}

      {Boolean(record.bankaddress) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.banks.fields.bankaddress')}
        >
          {record.bankaddress}
        </Form.Item>
      )}

      {Boolean(record.keys) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.banks.fields.keys')}
        >
          {record.keys}
        </Form.Item>
      )}

      {Boolean(record.bankTypes) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.banks.fields.bankTypes')}
        >
          {i18n(
            `entities.banks.enumerators.bankTypes.${record.bankTypes}`,
          )}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default BanksView;
