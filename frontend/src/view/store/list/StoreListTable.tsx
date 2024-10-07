import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/store/list/storeListActions';
import destroyActions from 'src/modules/store/destroy/storeDestroyActions';
import selectors from 'src/modules/store/list/storeListSelectors';
import destroySelectors from 'src/modules/store/destroy/storeDestroySelectors';
import storeSelectors from 'src/modules/store/storeSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import ImagesListView from 'src/view/shared/list/ImagesListView';

const StoreListTable = (props) => {
 const dispatch = useAppDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasPermissionToEdit = useSelector(
    storeSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    storeSelectors.selectPermissionToDestroy,
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
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.store.fields.storename'),
        sorter: true,
        dataIndex: 'storename',
      },
      {
        title: i18n('entities.store.fields.storedescription'),
        sorter: true,
        dataIndex: 'storedescription',
      },
      {
        title: i18n('entities.store.fields.storeImage'),
        sorter: false,
        dataIndex: 'storeImage',
        render: (value) => <ImagesListView value={value} />,
      },
      {
        title: i18n('entities.store.fields.storeURL'),
        sorter: true,
        dataIndex: 'storeURL',
      },
      {
        title: i18n('entities.store.fields.storeCategory'),
        sorter: true,
        dataIndex: 'storeCategory',
        render: (value) =>
          value
            ? i18n(
                `entities.store.enumerators.storeCategory.${value}`,
              )
            : null,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/store/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/store/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {hasPermissionToDestroy && (
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

export default StoreListTable;
