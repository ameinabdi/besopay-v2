import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import RolesViewItem from 'src/view/roles/view/RolesViewItem';

const PermissionView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.name) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.permission.fields.name')}
        >
          {record.name}
        </Form.Item>
      )}

      {Boolean(record.description) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.permission.fields.description')}
        >
          {record.description}
        </Form.Item>
      )}

      {Boolean(record.inRoles) && Boolean(record.inRoles.length) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.permission.fields.inRoles')}
        >
          <RolesViewItem value={record.inRoles} />
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default PermissionView;
