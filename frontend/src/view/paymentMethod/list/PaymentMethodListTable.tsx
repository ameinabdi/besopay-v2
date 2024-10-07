import { Table, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentMethod/list/paymentMethodListActions';
import destroyActions from 'src/modules/paymentMethod/destroy/paymentMethodDestroyActions';
import selectors from 'src/modules/paymentMethod/list/paymentMethodListSelectors';
import destroySelectors from 'src/modules/paymentMethod/destroy/paymentMethodDestroySelectors';
import paymentMethodSelectors from 'src/modules/paymentMethod/paymentMethodSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { Link } from 'react-router-dom';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import ImagesListView from 'src/view/shared/list/ImagesListView';
import BanksListItem from 'src/view/banks/list/BanksListItem';

const PaymentMethodListTable = (props) => {
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
    paymentMethodSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    paymentMethodSelectors.selectPermissionToDestroy,
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
        title: i18n('entities.paymentMethod.fields.bankTypes'),
        sorter: false,
        dataIndex: 'bankTypes',
        render: (value) => <BanksListItem value={value} />,
      },
      {
        title: i18n('entities.paymentMethod.fields.paymentMethodName'),
        sorter: true,
        dataIndex: 'paymentMethodName',
      },
      {
        title: i18n('entities.paymentMethod.fields.paymentMethodKey'),
        sorter: true,
        dataIndex: 'paymentMethodKey',
      },
      {
        title: i18n('entities.paymentMethod.fields.paymentMethodDescription'),
        sorter: true,
        dataIndex: 'paymentMethodDescription',
      },
      {
        title: i18n('entities.paymentMethod.fields.paymentMethodLogo'),
        sorter: false,
        dataIndex: 'paymentMethodLogo',
        render: (value) => <ImagesListView value={value} />,
      },
      {
        title: i18n('entities.paymentMethod.fields.paymentMethodThumbnail'),
        sorter: false,
        dataIndex: 'paymentMethodThumbnail',
        render: (value) => <ImagesListView value={value} />,
      },
      {
        title: i18n('entities.paymentMethod.fields.paymentMethodActive'),
        sorter: true,
        dataIndex: 'paymentMethodActive',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/payment-method/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {hasPermissionToEdit && (
            <Link to={`/payment-method/${record.id}/edit`}>
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

export default PaymentMethodListTable;
