import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import ProductViewItem from 'src/view/product/view/ProductViewItem';

const ProductOptionsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.optionTitle) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.productOptions.fields.optionTitle')}
        >
          {record.optionTitle}
        </Form.Item>
      )}

      {Boolean(record.optionDescription) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.productOptions.fields.optionDescription')}
        >
          {record.optionDescription}
        </Form.Item>
      )}

      {Boolean(record.product) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.productOptions.fields.product')}
          >
            <ProductViewItem value={record.product} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default ProductOptionsView;
