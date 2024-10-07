import React from 'react';
import { i18n } from 'src/i18n';
import PaymentMethodListFilter from 'src/view/paymentMethod/list/PaymentMethodListFilter';
import PaymentMethodListTable from 'src/view/paymentMethod/list/PaymentMethodListTable';
import PaymentMethodListToolbar from 'src/view/paymentMethod/list/PaymentMethodListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentMethodListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.paymentMethod.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.paymentMethod.list.title')}
        </PageTitle>

        <PaymentMethodListToolbar />
        <PaymentMethodListFilter />
        <PaymentMethodListTable />
      </ContentWrapper>
    </>
  );
};

export default PaymentMethodListPage;
