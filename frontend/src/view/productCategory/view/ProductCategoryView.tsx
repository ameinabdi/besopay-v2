import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import StoreViewItem from 'src/view/store/view/StoreViewItem';

const ProductCategoryView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.category) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.productCategory.fields.category')}
        >
          {record.category}
        </Form.Item>
      )}

      {Boolean(record.description) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.productCategory.fields.description')}
        >
          {record.description}
        </Form.Item>
      )}

      {Boolean(record.store) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.productCategory.fields.store')}
          >
            <StoreViewItem value={record.store} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default ProductCategoryView;
