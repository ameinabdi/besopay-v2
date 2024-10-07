import { Table, Popconfirm, Tooltip } from 'antd';
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
import ButtonLink from 'src/view/shared/styles/ButtonLink';
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
  const hasRolesToView = useSelector(
    rolesSelectors.selectRolesToView,
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
        render: (value) => {
          const visibleItems = value.slice(0, 3);
          const hiddenItems = value.slice(3);
        
          return (
            <Tooltip
              title={
                hiddenItems.length > 0 &&
                hiddenItems.map((item) => item.entity).join(', ')
              }
              placement="top"
            >
              <div>
                {visibleItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <PermissionListItem value={item} />
                    {index < visibleItems.length - 1 }
                  </React.Fragment>
                ))}
                {hiddenItems.length > 0 && <span>...</span>}
              </div>
            </Tooltip>
          );
        },
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
          {hasRolesToView && (
          <Link to={`/roles/${record.id}`}>
            {i18n('common.view')}
          </Link>
          )}
          {hasRolesToEdit && (
            <Link to={`/roles/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {hasRolesToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
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
