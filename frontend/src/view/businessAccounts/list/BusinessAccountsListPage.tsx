import React from 'react';
import BusinessAccountsListTable from 'src/view/businessAccounts/list/BusinessAccountsListTable';
import BusinessAccountsListToolbar from 'src/view/businessAccounts/list/BusinessAccountsListToolbar';
import { i18n } from 'src/i18n';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';

const BusinessAccountsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.businessAccounts.menu')],
        ]}
      />
     <ContentWrapper>
       <TopbarWrapper>
          <PageTitle>
            {i18n('entities.businessAccounts.list.title')}
          </PageTitle>
          <BusinessAccountsListToolbar />
        </TopbarWrapper>
      
        <BusinessAccountsListTable />
    </ContentWrapper>
    </>
  );
};

export default BusinessAccountsListPage;
