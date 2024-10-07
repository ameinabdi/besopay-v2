import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/refund/list/refundListActions';
import destroyActions from 'src/modules/refund/destroy/refundDestroyActions';
import selectors from 'src/modules/refund/list/refundListSelectors';
import destroySelectors from 'src/modules/refund/destroy/refundDestroySelectors';
import refundSelectors from 'src/modules/refund/refundSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import TransactionListItem from 'src/view/transaction/list/TransactionListItem';
import CustomerListItem from 'src/view/customer/list/CustomerListItem';

const RefundListTable = (props) => {
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
    refundSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    refundSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.refund.fields.transaction'),
        sorter: false,
        dataIndex: 'transaction',
        render: (value) => <TransactionListItem value={value} />,
      },
      {
          title: i18n('entities.refund.fields.transactionAmound'),
          sorter: true,
          dataIndex: 'transactionAmound',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(2)
              : value,
        },
      {
        title: i18n('entities.refund.fields.refundType'),
        sorter: true,
        dataIndex: 'refundType',
        render: (value) =>
          value
            ? i18n(
                `entities.refund.enumerators.refundType.${value}`,
              )
            : null,
      },
      {
        title: i18n('entities.refund.fields.customerNote'),
        sorter: true,
        dataIndex: 'customerNote',
      },
      {
        title: i18n('entities.refund.fields.businessNote'),
        sorter: true,
        dataIndex: 'businessNote',
      },
      {
        title: i18n('entities.refund.fields.customer'),
        sorter: false,
        dataIndex: 'customer',
        render: (value) => <CustomerListItem value={value} />,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/refund/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/refund/${record.id}/edit`}>
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

export default RefundListTable;
