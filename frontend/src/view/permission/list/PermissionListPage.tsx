import React from 'react';
import PermissionListFilter from 'src/view/permission/list/PermissionListFilter';
import PermissionListTable from 'src/view/permission/list/PermissionListTable';
import PermissionListToolbar from 'src/view/permission/list/PermissionListToolbar';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';

const PermissionListPage = (props) => {
  return (
    <>
       <TopbarWrapper>
        <PageTitle>
         
        </PageTitle>

        <PermissionListToolbar />
        </TopbarWrapper>

        <PermissionListFilter />
        <PermissionListTable />
    </>
  );
};

export default PermissionListPage;
