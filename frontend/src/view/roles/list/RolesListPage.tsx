import React from 'react';
import RolesListFilter from 'src/view/roles/list/RolesListFilter';
import RolesListTable from 'src/view/roles/list/RolesListTable';
import RolesListToolbar from 'src/view/roles/list/RolesListToolbar';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';

const RolesListPage = (props) => {
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

export default RolesListPage;
