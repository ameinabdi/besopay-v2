import React from 'react';
import PermissionListFilter from 'src/view/admin/PermissionListTab/PermissionListFilter';
import PermissionListTable from 'src/view/admin/PermissionListTab/PermissionListTable';

const PermissionListTab = (props) => {
  return (
    <>
        <PermissionListFilter />
        <PermissionListTable />
    </>
  );
};

export default PermissionListTab;
