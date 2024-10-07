import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/invoiceItems/list/invoiceItemsListActions';
import destroyActions from 'src/modules/invoiceItems/destroy/invoiceItemsDestroyActions';
import selectors from 'src/modules/invoiceItems/list/invoiceItemsListSelectors';
import destroySelectors from 'src/modules/invoiceItems/destroy/invoiceItemsDestroySelectors';
import invoiceItemsSelectors from 'src/modules/invoiceItems/invoiceItemsSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import InvoiceListItem from 'src/view/invoice/list/InvoiceListItem';

const InvoiceItemsListTable = (props) => {
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
    invoiceItemsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    invoiceItemsSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.invoiceItems.fields.invoice'),
        sorter: false,
        dataIndex: 'invoice',
        render: (value) => <InvoiceListItem value={value} />,
      },
      {
        title: i18n('entities.invoiceItems.fields.item'),
        sorter: true,
        dataIndex: 'item',
      },
      {
        title: i18n('entities.invoiceItems.fields.quantity'),
        sorter: true,  
        dataIndex: 'quantity',
        align: 'right',
      },
      {
        title: i18n('entities.invoiceItems.fields.unitPrice'),
        sorter: true,
        dataIndex: 'unitPrice',
        align: 'right',
      },
      {
        title: i18n('entities.invoiceItems.fields.totalAmount'),
        sorter: true,
        dataIndex: 'totalAmount',
        align: 'right',
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/invoice-items/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/invoice-items/${record.id}/edit`}>
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

export default InvoiceItemsListTable;
