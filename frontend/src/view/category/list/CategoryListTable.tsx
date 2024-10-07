import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/category/list/categoryListActions';
import destroyActions from 'src/modules/category/destroy/categoryDestroyActions';
import selectors from 'src/modules/category/list/categoryListSelectors';
import destroySelectors from 'src/modules/category/destroy/categoryDestroySelectors';
import categorySelectors from 'src/modules/category/categorySelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import ImagesListView from 'src/view/shared/list/ImagesListView';

const CategoryListTable = (props) => {
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
    categorySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    categorySelectors.selectPermissionToDestroy,
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
        title: i18n('entities.category.fields.categoryName'),
        sorter: true,
        dataIndex: 'categoryName',
      },
      {
        title: i18n('entities.category.fields.types'),
        sorter: true,
        dataIndex: 'types',
        render: (value) =>
          value
            ? i18n(
                `entities.category.enumerators.types.${value}`,
              )
            : null,
      },
      {
        title: i18n('entities.category.fields.active'),
        sorter: true,
        dataIndex: 'active',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
      {
        title: i18n('entities.category.fields.colorCode'),
        sorter: true,
        dataIndex: 'colorCode',
      },
      {
        title: i18n('entities.category.fields.thumnail'),
        sorter: false,
        dataIndex: 'thumnail',
        render: (value) => <ImagesListView value={value} />,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/category/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/category/${record.id}/edit`}>
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

export default CategoryListTable;
