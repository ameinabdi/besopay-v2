import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import ImagesViewer from 'src/view/shared/ImagesViewer';
import ProductCategoryViewItem from 'src/view/productCategory/view/ProductCategoryViewItem';

const ProductView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.productName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.product.fields.productName')}
        >
          {record.productName}
        </Form.Item>
      )}

      {Boolean(record.productDescription) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.product.fields.productDescription')}
        >
          {record.productDescription}
        </Form.Item>
      )}

      {(Boolean(record.price) || record.price === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.product.fields.price')}
          >
            {Number(record.price).toFixed(2)}
          </Form.Item>
        )}

      {(Boolean(record.sellingPrice) || record.sellingPrice === 0) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.product.fields.sellingPrice')}
          >
            {Number(record.sellingPrice).toFixed(2)}
          </Form.Item>
        )}

      {Boolean(record.stockUnit) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.product.fields.stockUnit')}
        >
          {record.stockUnit}
        </Form.Item>
      )}

      {Boolean(record.category) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.product.fields.category')}
          >
            <ProductCategoryViewItem value={record.category} />
          </Form.Item>
        )}

      {Boolean(record.productImages) && Boolean(record.productImages.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.product.fields.productImages')}
          >
            <ImagesViewer value={record.productImages} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default ProductView;
