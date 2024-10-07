import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/withdraw/list/withdrawListActions';
import destroyActions from 'src/modules/withdraw/destroy/withdrawDestroyActions';
import selectors from 'src/modules/withdraw/list/withdrawListSelectors';
import destroySelectors from 'src/modules/withdraw/destroy/withdrawDestroySelectors';
import withdrawSelectors from 'src/modules/withdraw/withdrawSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import moment from 'moment';
import BusinessAccountsListItem from 'src/view/businessAccounts/list/BusinessAccountsListItem';

const WithdrawListTable = (props) => {
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
    withdrawSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    withdrawSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.withdraw.fields.bankAccount'),
        sorter: false,
        dataIndex: 'bankAccount',
        render: (value) => <BusinessAccountsListItem value={value} />,
      },
      {
          title: i18n('entities.withdraw.fields.amount'),
          sorter: true,
          dataIndex: 'amount',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(4)
              : value,
        },
      {
        title: i18n('entities.withdraw.fields.description'),
        sorter: true,
        dataIndex: 'description',
      },
      {
        title: i18n('entities.withdraw.fields.paid'),
        sorter: true,
        dataIndex: 'paid',
        render: (value) =>
          value
            ? moment(value).format('YYYY-MM-DD HH:mm')
            : null,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/withdraw/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/withdraw/${record.id}/edit`}>
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

export default WithdrawListTable;
