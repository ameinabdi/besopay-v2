import React from 'react';
import { i18n } from 'src/i18n';
import CountryListFilter from 'src/view/country/list/CountryListFilter';
import CountryListTable from 'src/view/country/list/CountryListTable';
import CountryListToolbar from 'src/view/country/list/CountryListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const CountryListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.country.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.country.list.title')}
        </PageTitle>

        <CountryListToolbar />
        <CountryListFilter />
        <CountryListTable />
      </ContentWrapper>
    </>
  );
};

export default CountryListPage;
