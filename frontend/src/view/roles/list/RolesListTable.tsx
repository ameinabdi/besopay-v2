import { Table, Popconfirm, Button } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/roles/list/rolesListActions';
import destroyActions from 'src/modules/roles/destroy/rolesDestroyActions';
import selectors from 'src/modules/roles/list/rolesListSelectors';
import destroySelectors from 'src/modules/roles/destroy/rolesDestroySelectors';
import rolesSelectors from 'src/modules/roles/rolesSelectors';
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import { DeleteOutlined,EditOutlined, EyeOutlined } from '@ant-design/icons';
import UserListItem from 'src/view/user/list/UserListItem';
import PermissionListItem from 'src/view/permission/list/PermissionListItem';
import { useAppDispatch } from 'src/modules/hook';


const RolesListTable = (props) => {
    const dispatch = useAppDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading || false;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRolesToEdit = useSelector(
    rolesSelectors.selectRolesToEdit,
  );
  const hasRolesToDestroy = useSelector(
    rolesSelectors.selectRolesToDestroy,
  );

  useEffect(() => {
    dispatch(
      actions.doFetch(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.roles.fields.roles'),
        sorter: true,
        dataIndex: 'roles',
      },
      {
        title: i18n('entities.roles.fields.description'),
        sorter: true,
        dataIndex: 'description',
      },
      {
        title: i18n('entities.roles.fields.permissions'),
        sorter: false,
        dataIndex: 'permissions',
        render: (value) => <PermissionListItem value={value} />,
      },
      {
        title: i18n('entities.roles.fields.users'),
        sorter: false,
        dataIndex: 'users',
        render: (value) => <UserListItem value={value} />,
      },
      {
        title: i18n('entities.roles.fields.assignToNewUser'),
        sorter: true,
        dataIndex: 'assignToNewUser',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/roles/${record.id}`}>
             <Button
            type="primary" size="small"
            icon={ <EyeOutlined rev={undefined}  />}
          />
          </Link>
          {hasRolesToEdit && (
            <Link to={`/roles/${record.id}/edit`}>
             <Button
            type="primary"  size="small"
            icon={ <EditOutlined rev={undefined}  />}
          />
          </Link>
          )}
          {hasRolesToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <Button
                  type="primary" size="small"
                  icon={ <DeleteOutlined rev={undefined}  />}
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
        columns={columns as any}
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

export default RolesListTable;
