import { Avatar, Button, Popconfirm, Table } from 'antd';
import React from 'react';
import {  useSelector,  } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userSelectors from 'src/modules/user/userSelectors';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import UserStatusView from 'src/view/user/view/UserStatusView';
import { UserOutlined } from '@ant-design/icons';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import UserEditFormModal from 'src/view/user/edit/UserEditFormModal';
import { useAppDispatch } from 'src/modules/hook';
import RolesListItem from 'src/view/roles/list/RolesListItem';

const UserTable = (props) => {
  const dispatch = useAppDispatch()
;

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasUserToEdit = useSelector(
    userSelectors.selectUserToEdit,
  );
  const hasUserToDestroy = useSelector(
    userSelectors.selectUserToDestroy,
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(actions.doChangePaginationAndSort(pagination, sorter));
  };

  const doDestroy = (id) => {
    dispatch(actions.doDestroy(id));
  };

   const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = (id) => {
    setModalVisible(true);
    setUserId(id)
  };

  const doCreateSuccess = (record) => {
    window.location.reload();
    doCloseModal();
  };

  const columns = [
    {
      title: i18n('user.fields.avatars'),
      sorter: false,
      dataIndex: 'avatars',
      render: (_, record) => {
        return (
          <Avatar
            src={
              record.avatars && record.avatars.length
                ? record.avatars[0].downloadUrl
                : undefined
            }
            alt="avatar"
            icon={
              record.avatars &&
              record.avatars.length ? undefined : (
                <UserOutlined   />
              )
            }
          />
        );
      },
    },
    {
      title: i18n('user.fields.fullName'),
      sorter: true,
      dataIndex: 'fullName',
    },
    {
      title: i18n('user.fields.email'),
      sorter: true,
      dataIndex: 'email',
    },
    {
      title: i18n('user.fields.status'),
      sorter: true,
      dataIndex: 'status',
      render: (status) => <UserStatusView value={status} />,
    },
    {
      title: i18n('user.fields.roles'),
      sorter: false,
      dataIndex: 'inRoles',
      render: (value) => <RolesListItem value={value} />,
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          {hasUserToEdit && (
            <Button type='link' onClick={()=>doOpenModal(record.id)} >
              {i18n('common.edit')}
            </Button>
          )}
          {hasUserToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
               <Button
                  type="primary"
                  icon={ <DeleteOutlined   />}
                  danger
                />
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = () => {
    return {
      selectedRowKeys: selectedKeys,
      onChange: (selectedRowKeys) => {
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={rows}
        pagination={pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection()}
      />
      <UserEditFormModal
        visible={modalVisible}
        onCancel={doCloseModal}
        onSuccess={doCreateSuccess}
        id={userId}
      />
    </TableWrapper>
  );
};

export default UserTable;
