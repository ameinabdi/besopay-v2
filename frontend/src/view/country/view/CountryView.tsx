import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';


const CountryView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.country) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.country.fields.country')}
        >
          {record.country}
        </Form.Item>
      )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.country.fields.active')}
      >
        {record.active
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>
    </ViewWrapper>
  );
};

export default CountryView;
