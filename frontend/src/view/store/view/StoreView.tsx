import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import ImagesViewer from 'src/view/shared/ImagesViewer';

const StoreView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.storename) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.store.fields.storename')}
        >
          {record.storename}
        </Form.Item>
      )}

      {Boolean(record.storedescription) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.store.fields.storedescription')}
        >
          {record.storedescription}
        </Form.Item>
      )}

      {Boolean(record.storeImage) && Boolean(record.storeImage.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.store.fields.storeImage')}
          >
            <ImagesViewer value={record.storeImage} />
          </Form.Item>
        )}

      {Boolean(record.storeURL) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.store.fields.storeURL')}
        >
          {record.storeURL}
        </Form.Item>
      )}

      {Boolean(record.storeCategory) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.store.fields.storeCategory')}
        >
          {i18n(
            `entities.store.enumerators.storeCategory.${record.storeCategory}`,
          )}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default StoreView;
