import { Table, Popconfirm, Button,Drawer,Space, Dropdown } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/transaction/list/transactionListActions';
import destroyActions from 'src/modules/transaction/destroy/transactionDestroyActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
import destroySelectors from 'src/modules/transaction/destroy/transactionDestroySelectors';
import transactionSelectors from 'src/modules/transaction/transactionSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import PaymentMethodListItem from 'src/view/paymentMethod/list/PaymentMethodListItem';
import CustomerListItem from 'src/view/customer/list/CustomerListItem';
import CurrencyListItem from 'src/view/currency/list/CurrencyListItem';
import { DeleteOutlined,DownOutlined, EyeOutlined } from '@ant-design/icons';
import TransactionViewToolbar from '../view/TransactionViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapperUser';
import TransactionPage from '../view/TransactionViewPage';

const TransactionListTable = (props) => {
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
  const hasPermissionToDestroy = useSelector(
    transactionSelectors.selectPermissionToDestroy,
  );
  const [visible, setVisible] =  React.useState(null);

  const doClose = () => {
    setVisible(null);
  };

  const doOpen = (id) => {
    setVisible(id);
  };



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
        title: i18n('entities.transaction.fields.status'),
        sorter: true,
        dataIndex: 'status',
        render: (value) =>
          value
            ? i18n(
                `entities.transaction.enumerators.status.${value}`,
              )
            : null,
      },
      {
        title: i18n('entities.transaction.fields.paymentType'),
        sorter: true,
        dataIndex: 'paymentType',
        render: (value) =>
          value
            ? i18n(
                `entities.transaction.enumerators.paymentType.${value}`,
              )
            : null,
      },
      {
        title: i18n('entities.transaction.fields.paymentMethod'),
        sorter: false,
        dataIndex: 'paymentMethod',
        render: (value) => <PaymentMethodListItem value={value} />,
      },
      {
          title: i18n('entities.transaction.fields.amount'),
          sorter: true,
          dataIndex: 'amount',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(3)
              : value,
        },
      {
        title: i18n('entities.transaction.fields.customer'),
        sorter: false,
        dataIndex: 'customer',
        render: (value) => <CustomerListItem value={value} />,
      },
      {
        title: i18n('entities.transaction.fields.reference'),
        sorter: true,
        dataIndex: 'reference',
        width: '160px',
      },
      {
        title: i18n('entities.transaction.fields.currency'),
        sorter: false,
        dataIndex: 'currency',
        render: (value) => <CurrencyListItem value={value} />,
      },
      
      {
        title: '',
        dataIndex: '',
        fixed:'right',
        width: '160px',
        render: (_, record) => (
          <div className="table-actions" >
          <Dropdown
          trigger={['click']}
          menu={{
            items:[
              {
                label:i18n('common.view'),
                onClick:()=>doOpen(record.id),
                key: '1',
                icon:(<EyeOutlined rev={undefined}  />),
              },
              {
                label: (
                  <Popconfirm
                    title={i18n('common.areYouSure')}
                    onConfirm={() => doDestroy(record.id)}
                    okText={i18n('common.yes')}
                    cancelText={i18n('common.no')}
                    placement="leftBottom"
                  >
                      {i18n('common.destroy')}
                  </Popconfirm>
                ),
                disabled:!hasPermissionToDestroy,
                icon:(<DeleteOutlined rev={undefined}  />),
                key: '2',
              },
            ],
          }
        }
          >
            <Button>
            {i18n('common.actions')} <DownOutlined rev={undefined}  />
            </Button>
              </Dropdown>
              <Drawer
              title={i18n('entities.transaction.view.title')}
              width="40%"
              onClose={doClose}
              visible={visible === null ? false : visible === record.id ? true : false}
              bodyStyle={{ paddingBottom: 80 }}
              /* @ts-ignore */
              extra={
                <Space>
                  <TransactionViewToolbar match={{id:record?.id}}  record={record} />
                </Space>
              }
              >
              <ContentWrapper>
                <TransactionPage id={visible}  />
              </ContentWrapper>
            </Drawer>
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

export default TransactionListTable;
