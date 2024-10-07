import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/invoice/list/invoiceListActions';
import destroyActions from 'src/modules/invoice/destroy/invoiceDestroyActions';
import selectors from 'src/modules/invoice/list/invoiceListSelectors';
import destroySelectors from 'src/modules/invoice/destroy/invoiceDestroySelectors';
import invoiceSelectors from 'src/modules/invoice/invoiceSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import CustomerListItem from 'src/view/customer/list/CustomerListItem';
import CurrencyListItem from 'src/view/currency/list/CurrencyListItem';
import { EditOutlined, DeleteOutlined, EyeOutlined } from  '@ant-design/icons';
const InvoiceListTable = (props) => {
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
    invoiceSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    invoiceSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.invoice.fields.customer'),
        sorter: false,
        dataIndex: 'customer',
        render: (value) => <CustomerListItem value={value} />,
      },
      {
        title: i18n('entities.invoice.fields.dueDate'),
        sorter: true,
        dataIndex: 'dueDate',
      },
      {
        title: i18n('entities.invoice.fields.currency'),
        sorter: true,
        dataIndex: 'currency',
        render: (value) => <CurrencyListItem value={value} />,

      },
      {
        title: i18n('entities.invoice.fields.invoiceNote'),
        sorter: true,
        dataIndex: 'invoiceNote',
      },
      {
        title: i18n('entities.invoice.fields.totalAmount'),
        sorter: true,
        dataIndex: 'totalAmount',
        align: 'right',
        render: (value) =>
          value || value === 0
            ? Number(value).toFixed(2)
            : value,
      },
      {
          title: i18n('entities.invoice.fields.shippingFee'),
          sorter: true,
          dataIndex: 'shippingFee',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(2)
              : value,
        },
      {
          title: i18n('entities.invoice.fields.discount'),
          sorter: true,
          dataIndex: 'discount',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(2)
              : value,
        },
      {
          title: i18n('entities.invoice.fields.tax'),
          sorter: true,
          dataIndex: 'tax',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(2)
              : value,
        },
        {
          title: i18n('entities.invoice.fields.grantTotal'),
          sorter: true,
          dataIndex: 'grantTotal',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(2)
              : value,
        },
      {
        title: i18n('entities.invoice.fields.otherEmails'),
        sorter: true,
        dataIndex: 'otherEmails',
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/invoice/${record.id}`}>
            <EyeOutlined />
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/invoice/${record.id}/edit`}>
             <EditOutlined />
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
               <DeleteOutlined />
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

export default InvoiceListTable;
