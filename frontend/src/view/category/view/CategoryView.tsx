import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import ImagesViewer from 'src/view/shared/ImagesViewer';

const CategoryView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.categoryName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.category.fields.categoryName')}
        >
          {record.categoryName}
        </Form.Item>
      )}

      {Boolean(record.types) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.category.fields.types')}
        >
          {i18n(
            `entities.category.enumerators.types.${record.types}`,
          )}
        </Form.Item>
      )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.category.fields.active')}
      >
        {record.active
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>

      {Boolean(record.colorCode) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.category.fields.colorCode')}
        >
          {record.colorCode}
        </Form.Item>
      )}

      {Boolean(record.thumnail) && Boolean(record.thumnail.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n('entities.category.fields.thumnail')}
          >
            <ImagesViewer value={record.thumnail} />
          </Form.Item>
        )}
    </ViewWrapper>
  );
};

export default CategoryView;
