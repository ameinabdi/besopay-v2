import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/payment/list/paymentListActions';
import destroyActions from 'src/modules/payment/destroy/paymentDestroyActions';
import selectors from 'src/modules/payment/list/paymentListSelectors';
import destroySelectors from 'src/modules/payment/destroy/paymentDestroySelectors';
import paymentSelectors from 'src/modules/payment/paymentSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import CustomerListItem from 'src/view/customer/list/CustomerListItem';
import ProductListItem from 'src/view/product/list/ProductListItem';
import PaymentLinkListItem from 'src/view/paymentLink/list/PaymentLinkListItem';
import InvoiceListItem from 'src/view/invoice/list/InvoiceListItem';
import PaymentMethodListItem from 'src/view/paymentMethod/list/PaymentMethodListItem';
import CurrencyListItem from 'src/view/currency/list/CurrencyListItem';

const PaymentListTable = (props) => {
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
    paymentSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    paymentSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.payment.fields.customer'),
        sorter: false,
        dataIndex: 'customer',
        render: (value) => <CustomerListItem value={value} />,
      },
      {
        title: i18n('entities.payment.fields.paymentType'),
        sorter: true,
        dataIndex: 'paymentType',
        render: (value) =>
          value
            ? i18n(
                `entities.payment.enumerators.paymentType.${value}`,
              )
            : null,
      },
      {
        title: i18n('entities.payment.fields.product'),
        sorter: false,
        dataIndex: 'product',
        render: (value) => <ProductListItem value={value} />,
      },
      {
        title: i18n('entities.payment.fields.paymentLink'),
        sorter: false,
        dataIndex: 'paymentLink',
        render: (value) => <PaymentLinkListItem value={value} />,
      },
      {
        title: i18n('entities.payment.fields.invoice'),
        sorter: false,
        dataIndex: 'invoice',
        render: (value) => <InvoiceListItem value={value} />,
      },
      {
        title: i18n('entities.payment.fields.paymentMethod'),
        sorter: false,
        dataIndex: 'paymentMethod',
        render: (value) => <PaymentMethodListItem value={value} />,
      },
      {
          title: i18n('entities.payment.fields.amount'),
          sorter: true,
          dataIndex: 'amount',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(4)
              : value,
        },
      {
        title: i18n('entities.payment.fields.paid'),
        sorter: true,
        dataIndex: 'paid',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
      {
        title: i18n('entities.payment.fields.currency'),
        sorter: false,
        dataIndex: 'currency',
        render: (value) => <CurrencyListItem value={value} />,
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/payment/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/payment/${record.id}/edit`}>
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

export default PaymentListTable;
