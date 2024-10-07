import React from 'react';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import rolesSelectors from 'src/modules/roles/rolesSelectors';
import selectors from 'src/modules/roles/list/rolesListSelectors';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import actions from 'src/modules/roles/list/rolesListActions';
import destroyActions from 'src/modules/roles/destroy/rolesDestroyActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import destroySelectors from 'src/modules/roles/destroy/rolesDestroySelectors';
import {
  FileExcelOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from 'src/modules/hook';
import RolesFormModal from 'src/view/roles/form/RolesFormModal';

const RolesToolbar = (props) => {
  const dispatch = useAppDispatch();
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasRolesToAuditLogs = useSelector(
    auditLogSelectors.selectAuditLogToRead,
  );
  const hasRolesToDestroy = useSelector(
    rolesSelectors.selectRolesToDestroy,
  );
  const hasRolesToCreate = useSelector(
    rolesSelectors.selectRolesToCreate,
  );
  const [modalVisible, setModalVisible] = React.useState(false);

  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    window.location.reload();
    doCloseModal();
  };

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const doDestroyAllSelected = () => {
    dispatch(destroyActions.doDestroyAll(selectedKeys));
  };

  const renderExportButton = () => {
    const disabled = !hasRows || loading;
    const button = (
      <Button
        disabled={disabled}
        icon={<FileExcelOutlined  />}
        onClick={doExport}
        loading={exportLoading}
      >
        {i18n('common.export')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.noDataToExport')}>
          {button}
        </Tooltip>
      );
    }

    return button;
  };

  const renderDestroyButton = () => {
    if (!hasRolesToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;
    const button = (
      <Button
        disabled={disabled}
        loading={destroyLoading}
        type="primary"
        icon={<DeleteOutlined  />}
      >
        {i18n('common.destroy')}
      </Button>
    );
    const buttonWithConfirm = (
      <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => doDestroyAllSelected()}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        {button}
      </Popconfirm>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return buttonWithConfirm;
  };

  return (
    <Toolbar>
      {hasRolesToCreate && (
          <Button type="primary" icon={<PlusOutlined  />} onClick={doOpenModal}>
            {i18n('common.new')}
          </Button>
      )}
      {renderDestroyButton()}
      {hasRolesToAuditLogs && (
        <Link to="/audit-logs?entityNames=roles">
          <Button icon={<FileSearchOutlined  />}>
            {i18n('auditLog.menu')}
          </Button>
        </Link>
      )}

      {renderExportButton()}
      <RolesFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
      />
    </Toolbar>
  );
};

export default RolesToolbar;
