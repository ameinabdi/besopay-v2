import React from 'react';
import RolesListFilter from 'src/view/admin/RoleListTab/RolesListFilter';
import RolesListTable from 'src/view/admin/RoleListTab/RolesListTable';
import RolesListToolbar from 'src/view/admin/RoleListTab/RolesListToolbar';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';

const RolesListTab = (props) => {
  return (
      <div>
        <TopbarWrapper>
        <PageTitle>
         
        </PageTitle>

        <RolesListToolbar />
        </TopbarWrapper>
        <RolesListFilter />
        <RolesListTable />
      </div>
  );
};

export default RolesListTab;
