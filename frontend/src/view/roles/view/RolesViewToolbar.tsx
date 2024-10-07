import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';

import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import rolesSelectors from 'src/modules/roles/rolesSelectors';
import destroyActions from 'src/modules/roles/destroy/rolesDestroyActions';
import destroySelectors from 'src/modules/roles/destroy/rolesDestroySelectors';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { useParams
 } from 'react-router-dom';

const RolesViewToolbar = (props) => {
    const dispatch = useAppDispatch();
  const match = useParams
();

  const hasRolesToAuditLogs = useSelector(
    auditLogSelectors.selectAuditLogToRead,
  );
  const hasRolesToEdit = useSelector(
    rolesSelectors.selectRolesToEdit,
  );
  const hasRolesToDestroy = useSelector(
    rolesSelectors.selectRolesToDestroy,
  );
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const id:any = match.id
;

  const doDestroy = () => {
    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <Toolbar>
      {hasRolesToEdit && (
        <Link to={`/roles/${id}/edit`}>
          <Button type="primary" icon={<EditOutlined   />}>
            {i18n('common.edit')}
          </Button>
        </Link>
      )}

      {hasRolesToDestroy && (
        <Popconfirm
          title={i18n('common.areYouSure')}
          onConfirm={doDestroy}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        >
          <Button
            type="primary"
            icon={<DeleteOutlined   />}
            disabled={destroyLoading}
          >
            {i18n('common.destroy')}
          </Button>
        </Popconfirm>
      )}

      {hasRolesToAuditLogs && (
        <Link
          to={`/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
        >
          <Button icon={<FileSearchOutlined   />}>
            {i18n('auditLog.menu')}
          </Button>
        </Link>
      )}
    </Toolbar>
  );
};

export default RolesViewToolbar;
