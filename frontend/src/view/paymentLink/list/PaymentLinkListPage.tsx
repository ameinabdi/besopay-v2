import React from 'react';
import { i18n } from 'src/i18n';
import PaymentLinkListFilter from 'src/view/paymentLink/list/PaymentLinkListFilter';
import PaymentLinkListTable from 'src/view/paymentLink/list/PaymentLinkListTable';
import PaymentLinkListToolbar from 'src/view/paymentLink/list/PaymentLinkListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';

const PaymentLinkListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.paymentLink.menu')],
        ]}
      />

      <ContentWrapper>
       <TopbarWrapper>
       <PageTitle>
          {i18n('entities.paymentLink.list.title')}
        </PageTitle>

        <PaymentLinkListToolbar />
       </TopbarWrapper>
        <PaymentLinkListFilter />
        <PaymentLinkListTable />
      </ContentWrapper>
    </>
  );
};

export default PaymentLinkListPage;
