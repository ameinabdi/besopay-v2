import React from 'react';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import businessAccountsSelectors from 'src/modules/businessAccounts/businessAccountsSelectors';
import selectors from 'src/modules/businessAccounts/list/businessAccountsListSelectors';
import destroyActions from 'src/modules/businessAccounts/destroy/businessAccountsDestroyActions';
import { i18n } from 'src/i18n';
import destroySelectors from 'src/modules/businessAccounts/destroy/businessAccountsDestroySelectors';
import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import BusinessAccountsFormModal from '../form/BusinessAccountsFormModal';

const BusinessAccountsToolbar = (props) => {
 const dispatch = useAppDispatch();
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
 
  const hasPermissionToDestroy = useSelector(
    businessAccountsSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    businessAccountsSelectors.selectPermissionToCreate,
  );
  const [modalVisible, setModalVisible] =  React.useState(false);

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

  const doDestroyAllSelected = () => {
    dispatch(destroyActions.doDestroyAll(selectedKeys));
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
      <BusinessAccountsFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
      />
      {renderDestroyButton()}
    </Toolbar>
  );
};

export default BusinessAccountsToolbar;
