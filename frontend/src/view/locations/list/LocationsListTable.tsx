import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/locations/list/locationsListActions';
import destroyActions from 'src/modules/locations/destroy/locationsDestroyActions';
import selectors from 'src/modules/locations/list/locationsListSelectors';
import destroySelectors from 'src/modules/locations/destroy/locationsDestroySelectors';
import locationsSelectors from 'src/modules/locations/locationsSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';


const LocationsListTable = (props) => {
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
    locationsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    locationsSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.locations.fields.city'),
        sorter: true,
        dataIndex: 'city',
      },
      {
        title: i18n('entities.locations.fields.state'),
        sorter: true,
        dataIndex: 'state',
      },
      {
        title: i18n('entities.locations.fields.country'),
        sorter: true,
        dataIndex: 'country',
      },
      {
        title: i18n('entities.locations.fields.streetAddress'),
        sorter: true,
        dataIndex: 'streetAddress',
      },
      {
        title: i18n('entities.locations.fields.type'),
        sorter: true,
        dataIndex: 'type',
        render: (value) =>
          value
            ? i18n(
                `entities.locations.enumerators.type.${value}`,
              )
            : null,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/locations/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/locations/${record.id}/edit`}>
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

export default LocationsListTable;
