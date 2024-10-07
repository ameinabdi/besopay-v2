import React from 'react';
import { i18n } from 'src/i18n';
import InvoiceItemsListFilter from 'src/view/invoiceItems/list/InvoiceItemsListFilter';
import InvoiceItemsListTable from 'src/view/invoiceItems/list/InvoiceItemsListTable';
import InvoiceItemsListToolbar from 'src/view/invoiceItems/list/InvoiceItemsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const InvoiceItemsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.invoiceItems.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.invoiceItems.list.title')}
        </PageTitle>

        <InvoiceItemsListToolbar />
        <InvoiceItemsListFilter />
        <InvoiceItemsListTable />
      </ContentWrapper>
    </>
  );
};

export default InvoiceItemsListPage;
