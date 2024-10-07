import React from 'react';
import { i18n } from 'src/i18n';
import InvoiceListFilter from 'src/view/invoice/list/InvoiceListFilter';
import InvoiceListTable from 'src/view/invoice/list/InvoiceListTable';
import InvoiceListToolbar from 'src/view/invoice/list/InvoiceListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const InvoiceListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.invoice.menu')],
        ]}
      />

      <ContentWrapper>
        <TopbarWrapper>
          <PageTitle>
            {i18n('entities.invoice.list.title')}
          </PageTitle>
          <InvoiceListToolbar />
        </TopbarWrapper>
        <InvoiceListFilter />
        <InvoiceListTable />
      </ContentWrapper>
    </>
  );
};

export default InvoiceListPage;
