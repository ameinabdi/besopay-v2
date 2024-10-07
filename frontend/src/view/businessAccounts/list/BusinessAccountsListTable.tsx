
import { Table,Button, Popconfirm } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/businessAccounts/list/businessAccountsListActions';
import destroyActions from 'src/modules/businessAccounts/destroy/businessAccountsDestroyActions';
import selectors from 'src/modules/businessAccounts/list/businessAccountsListSelectors';
import destroySelectors from 'src/modules/businessAccounts/destroy/businessAccountsDestroySelectors';
import businessAccountsSelectors from 'src/modules/businessAccounts/businessAccountsSelectors';
import React,{ useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import BanksListItem from 'src/view/banks/list/BanksListItem';
import CurrencyListItem from 'src/view/currency/list/CurrencyListItem';
import BusinessAccountsFormModal from '../form/BusinessAccountsFormModal';

const BusinessAccountsListTable = (props) => {
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
    businessAccountsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    businessAccountsSelectors.selectPermissionToDestroy,
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
  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [modalVisible, setModalVisible] =  React.useState(false);
  const [selectedRecord, setSelectedRecord] =  React.useState(null);

  const doCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null)
  };

  const doOpenModal = (record) => {
    setModalVisible(true);
    setSelectedRecord(record)
  };
  const doCreateSuccess = (record) => {
    window.location.reload();
    doCloseModal();
  };
  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const columns = [
      {
        title: i18n('entities.businessAccounts.fields.bankType'),
        sorter: false,
        dataIndex: 'bankType',
        render: (value) => <BanksListItem value={value} />,
      },
      {
        title: i18n('entities.businessAccounts.fields.accountName'),
        sorter: true,
        dataIndex: 'accountName',
      },
      {
        title: i18n('entities.businessAccounts.fields.accountNumber'),
        sorter: true,
        dataIndex: 'accountNumber',
      },
      {
        title: i18n('entities.businessAccounts.fields.telephone'),
        sorter: true,
        dataIndex: 'telephone',
      },
      {
        title: i18n('entities.businessAccounts.fields.currency'),
        sorter: false,
        dataIndex: 'currency',
        render: (value) => <CurrencyListItem value={value} />,
      },
      {
        title: i18n('entities.businessAccounts.fields.isPrimary'),
        sorter: true,
        dataIndex: 'isPrimary',
        render: (value) =>
          value ? i18n('common.yes') : i18n('common.no'),
      },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          {hasPermissionToEdit && (
            <Button type="link"  onClick={()=>doOpenModal(record)}>
              {i18n('common.edit')}
            </Button>
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
           <BusinessAccountsFormModal
            visible={modalVisible}
            onCancel={doCloseModal}
            onSuccess={doCreateSuccess}
            record={selectedRecord}
          />
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

export default BusinessAccountsListTable;
