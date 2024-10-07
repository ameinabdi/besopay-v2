import React from 'react';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import invoiceSelectors from 'src/modules/invoice/invoiceSelectors';
import selectors from 'src/modules/invoice/list/invoiceListSelectors';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import actions from 'src/modules/invoice/list/invoiceListActions';
import destroyActions from 'src/modules/invoice/destroy/invoiceDestroyActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import destroySelectors from 'src/modules/invoice/destroy/invoiceDestroySelectors';
import {
  FileExcelOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import InvoiceFormModal from '../form/InvoiceFormModal';

const InvoiceToolbar = (props) => {
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
  const hasPermissionToAuditLogs = useSelector(
       auditLogSelectors.selectAuditLogToRead,

  );
  const hasPermissionToDestroy = useSelector(
    invoiceSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    invoiceSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    invoiceSelectors.selectPermissionToImport,
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };
  const doExport = () => {
    dispatch(actions.doExport());
  };
  const doCreateSuccess = (record) => {
    dispatch(actions.doFetch());
    doCloseModal();
  };


  const doDestroyAllSelected = () => {
    dispatch(destroyActions.doDestroyAll(selectedKeys));
  };

  const renderExportButton = () => {
    const disabled = !hasRows || loading;
    const button = (
      <Button
        disabled={disabled}
        icon={<FileExcelOutlined />}
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
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;
    const button = (
      <Button
        disabled={disabled}
        loading={destroyLoading}
        type="primary"
        icon={<DeleteOutlined />}
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
      {hasPermissionToCreate && (
        <Button type="primary" icon={<PlusOutlined />}  onClick={doOpenModal}>
          {i18n('common.new')}
        </Button>
      )}

      {hasPermissionToImport && (
        <Link to="/invoice/importer">
          <Button type="primary" icon={<UploadOutlined />}>
            {i18n('common.import')}
          </Button>
        </Link>
      )}

      {renderDestroyButton()}

      {hasPermissionToAuditLogs && (
        <Link to="/audit-logs?entityNames=invoice">
          <Button icon={<FileSearchOutlined />}>
            {i18n('auditLog.menu')}
          </Button>
        </Link>
      )}
      <InvoiceFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
      />
      {renderExportButton()}
    </Toolbar>
  );
};

export default InvoiceToolbar;
