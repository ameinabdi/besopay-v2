import { Table, Popconfirm,Checkbox } from 'antd';
import { i18n } from 'src/i18n';
import actions from 'src/modules/permission/list/permissionListActions';
import selectors from 'src/modules/permission/list/permissionListSelectors';
import destroySelectors from 'src/modules/permission/destroy/permissionDestroySelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import RolesListItem from 'src/view/roles/list/RolesListItem';
import { useAppDispatch } from 'src/modules/hook';
import updateactions from 'src/modules/permission/form/permissionFormActions';

const PermissionListTable = (props) => {
  const dispatch = useAppDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
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


  const update = (id,  data) => {
    dispatch(updateactions.doUpdate(id, data));
  };

  const columns = [
      {
        title: i18n('entities.permission.fields.entity'),
        sorter: false,
        dataIndex: 'entity',
      },
      {
        title: i18n('entities.permission.fields.add'),
        dataIndex: '',
        render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {add:!value.add})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.add}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.edit'),
        dataIndex: '',
        render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {edit:!value.edit})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.edit}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.list'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {list:!value.list})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.list}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.view'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {view:!value.view})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.view}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.trash'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {trash:!value.deleteData})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.trash}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.exportData'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {exportData:!value.exportData})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.exportData}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.importData'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {importData:!value.importData})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.importData}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.search'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {search:!value.search})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.search}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.print'),
        dataIndex: '',
         render: (value) =>
        <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => update(value.id, {print:!value.print})}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        <Checkbox 
        checked={value.print}/>
      </Popconfirm>
      },
      {
        title: i18n('entities.permission.fields.inRole'),
        sorter: false,
        dataIndex: 'inRole',
        render: (value) => <RolesListItem value={value} />,
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
        pagination={false}
        onChange={handleTableChange}
        rowSelection={rowSelection()}
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default PermissionListTable;
