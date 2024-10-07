import React from 'react';
import { i18n } from 'src/i18n';
import PaymentListFilter from 'src/view/payment/list/PaymentListFilter';
import PaymentListTable from 'src/view/payment/list/PaymentListTable';
import PaymentListToolbar from 'src/view/payment/list/PaymentListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.payment.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.payment.list.title')}
        </PageTitle>

        <PaymentListToolbar />
        <PaymentListFilter />
        <PaymentListTable />
      </ContentWrapper>
    </>
  );
};

export default PaymentListPage;
