import { Table, Popconfirm, Button } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/country/list/countryListActions';
import destroyActions from 'src/modules/country/destroy/countryDestroyActions';
import selectors from 'src/modules/country/list/countryListSelectors';
import destroySelectors from 'src/modules/country/destroy/countryDestroySelectors';
import countrySelectors from 'src/modules/country/countrySelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import { DeleteOutlined,EditOutlined, EyeOutlined } from '@ant-design/icons';


const CountryListTable = (props) => {
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
    countrySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    countrySelectors.selectPermissionToDestroy,
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
        title: i18n('entities.country.fields.country'),
        sorter: true,
        dataIndex: 'country',
      },
      {
        title: i18n('entities.country.fields.active'),
        sorter: true,
        dataIndex: 'active',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/country/${record.id}`}>
            <Button
            type="primary"
            icon={ <EyeOutlined rev={undefined}  />}
          />
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/country/${record.id}/edit`}>
             <Button
            type="primary"
            icon={ <EditOutlined rev={undefined}  />}
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

export default CountryListTable;
