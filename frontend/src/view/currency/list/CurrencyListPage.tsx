import React from 'react';
import { i18n } from 'src/i18n';
import CurrencyListFilter from 'src/view/currency/list/CurrencyListFilter';
import CurrencyListTable from 'src/view/currency/list/CurrencyListTable';
import CurrencyListToolbar from 'src/view/currency/list/CurrencyListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const CurrencyListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.currency.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.currency.list.title')}
        </PageTitle>

        <CurrencyListToolbar />
        <CurrencyListFilter />
        <CurrencyListTable />
      </ContentWrapper>
    </>
  );
};

export default CurrencyListPage;
