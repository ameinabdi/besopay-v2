import React from 'react';
import { i18n } from 'src/i18n';
import BusinessListFilter from 'src/view/business/list/BusinessListFilter';
import BusinessListTable from 'src/view/business/list/BusinessListTable';
import BusinessListToolbar from 'src/view/business/list/BusinessListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.business.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.business.list.title')}
        </PageTitle>

        <BusinessListToolbar />
        <BusinessListFilter />
        <BusinessListTable />
      </ContentWrapper>
    </>
  );
};

export default BusinessListPage;
