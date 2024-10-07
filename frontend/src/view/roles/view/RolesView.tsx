import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form } from 'antd';
import UserViewItem from 'src/view/user/view/UserViewItem';
import PermissionViewItem from 'src/view/permission/view/PermissionViewItem';

const RolesView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.roles) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.roles.fields.roles')}
        >
          {record.roles}
        </Form.Item>
      )}

      {Boolean(record.description) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.roles.fields.description')}
        >
          {record.description}
        </Form.Item>
      )}

      {Boolean(record.permissions) && Boolean(record.permissions.length) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.roles.fields.permissions')}
        >
          <PermissionViewItem value={record.permissions} />
        </Form.Item>
      )}

      {Boolean(record.users) &&
        Boolean(record.users.length) && (
          <Form.Item
            {...viewItemLayout}
            label={i18n(
              'entities.roles.fields.users',
            )}
          >
            <UserViewItem value={record.users} />
          </Form.Item>
        )}

      <Form.Item
        {...viewItemLayout}
        label={i18n('entities.roles.fields.assignToNewUser')}
      >
        {record.assignToNewUser
          ? i18n('common.yes')
          : i18n('common.no')}
      </Form.Item>
    </ViewWrapper>
  );
};

export default RolesView;
