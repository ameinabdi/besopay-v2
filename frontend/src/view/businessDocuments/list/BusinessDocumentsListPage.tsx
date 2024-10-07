import React from 'react';
import { i18n } from 'src/i18n';
import BusinessDocumentsListFilter from 'src/view/businessDocuments/list/BusinessDocumentsListFilter';
import BusinessDocumentsListTable from 'src/view/businessDocuments/list/BusinessDocumentsListTable';
import BusinessDocumentsListToolbar from 'src/view/businessDocuments/list/BusinessDocumentsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessDocumentsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.businessDocuments.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.businessDocuments.list.title')}
        </PageTitle>

        <BusinessDocumentsListToolbar />
        <BusinessDocumentsListFilter />
        <BusinessDocumentsListTable />
      </ContentWrapper>
    </>
  );
};

export default BusinessDocumentsListPage;
