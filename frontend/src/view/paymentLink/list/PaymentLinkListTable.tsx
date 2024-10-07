import { Table, Popconfirm, Button,Drawer,Space, Dropdown } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentLink/list/paymentLinkListActions';
import destroyActions from 'src/modules/paymentLink/destroy/paymentLinkDestroyActions';
import selectors from 'src/modules/paymentLink/list/paymentLinkListSelectors';
import destroySelectors from 'src/modules/paymentLink/destroy/paymentLinkDestroySelectors';
import paymentLinkSelectors from 'src/modules/paymentLink/paymentLinkSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import CurrencyListItem from 'src/view/currency/list/CurrencyListItem';
import ContentWrapper from 'src/view/layout/styles/ContentWrapperUser';
import { DeleteOutlined,DownOutlined, EyeOutlined } from '@ant-design/icons';
import PaymentLinkPage from '../view/PaymentLinkViewPage';
import PaymentLinkViewToolbar from '../view/PaymentLinkViewToolbar';


const PaymentLinkListTable = (props) => {
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
    paymentLinkSelectors.selectPermissionToDestroy,
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
  const [visible, setVisible] =  React.useState(null);

  const doClose = () => {
    setVisible(null);
  };

  const doOpen = (id) => {
    setVisible(id);
  };


  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.paymentLink.fields.typePaymentLink'),
        sorter: true,
        dataIndex: 'typePaymentLink',
        render: (value) =>
          value
            ? i18n(
                `entities.paymentLink.enumerators.typePaymentLink.${value}`,
              )
            : null,
      },
      {
        title: i18n('entities.paymentLink.fields.paymentLinkName'),
        sorter: true,
        dataIndex: 'paymentLinkName',
      },
      {
        title: i18n('entities.paymentLink.fields.currency'),
        sorter: true,
        dataIndex: 'currency',
        render:(value)=>(<CurrencyListItem value={value}/>)
      },
      {
          title: i18n('entities.paymentLink.fields.amount'),
          sorter: true,
          dataIndex: 'amount',
          align: 'right',
          render: (value) =>
            value || value === 0
              ? Number(value).toFixed(2)
              : value,
        },
      {
        title: i18n('entities.paymentLink.fields.customurl'),
        sorter: true,
        dataIndex: 'customurl',
        render:(value)=>(<a 
          //@ts-ignore
          href={value} target="_blank" rel="noreferrer">Click Here</a>)
      },
      {
        title: i18n('entities.paymentLink.fields.redirecturl'),
        sorter: true,
        dataIndex: 'redirecturl',
      },
     
      {
        title: i18n('entities.paymentLink.fields.interval'),
        sorter: true,
        dataIndex: 'interval',
        render: (value) =>
          value
            ? i18n(
                `entities.paymentLink.enumerators.interval.${value}`,
              )
            : null,
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
            title={i18n('entities.paymentLink.view.title')}
            width="40%"
            onClose={doClose}
            visible={visible === null ? false : visible === record.id ? true : false}
            bodyStyle={{ paddingBottom: 80 }}
            /* @ts-ignore */
            extra={
              <Space>
                <PaymentLinkViewToolbar match={{id:record?.id}}  record={record} />
              </Space>
            }
            >
            <ContentWrapper>
            <PaymentLinkPage id={visible}  />
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

export default PaymentLinkListTable;
