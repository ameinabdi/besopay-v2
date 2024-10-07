import { Avatar, Popconfirm, Table,Button, Tooltip } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userSelectors from 'src/modules/user/userSelectors';
import Roles from 'src/security/roles';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import UserStatusView from 'src/view/user/view/UserStatusView';
import { UserOutlined } from '@ant-design/icons';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined
} from '@ant-design/icons';
const UserTable = (props) => {
  const dispatch = useAppDispatch();

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectUserToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectUserToDestroy,
  );

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const doDestroy = (id) => {
    dispatch(actions.doDestroy(id));
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
      title: i18n('user.fields.roles'),
      sorter: false,
      dataIndex: '',
      render: (record) =>{
        if(record?.roles?.length > 0){
         return record?.roles?.map((roleId) => (
            <div key={roleId}>
              <Tooltip title={Roles.descriptionOf(roleId)}>
                <span>{Roles.labelOf(roleId)}</span>
              </Tooltip>
            </div>
          ))
        }else{
         return record?.tenants?.map((tenant) => {
              return(
                tenant.roles?.map((roleId) => (
                  <div key={roleId}>
                    <Tooltip title={Roles.descriptionOf(roleId)}>
                      <span>{Roles.labelOf(roleId)}</span>
                    </Tooltip>
                  </div>
              ))
              )
            })
        }
      }
        ,
    },
    {
      title: i18n('user.fields.status'),
      sorter: true,
      dataIndex: 'status',
      render: (status) => <UserStatusView value={status} />,
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/user/${record.id}`}>
            <Button
            type="primary"
            icon={ <EyeOutlined   />}
          />
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/user/${record.id}/edit`}>
             <Button
            type="primary"
            icon={ <EditOutlined   />}
          />
          </Link>
          )}
          {hasPermissionToDestroy && (
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
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default UserTable;
