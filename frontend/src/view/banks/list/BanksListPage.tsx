import React from 'react';
import { i18n } from 'src/i18n';
import BanksListFilter from 'src/view/banks/list/BanksListFilter';
import BanksListTable from 'src/view/banks/list/BanksListTable';
import BanksListToolbar from 'src/view/banks/list/BanksListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BanksListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.banks.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.banks.list.title')}
        </PageTitle>

        <BanksListToolbar />
        <BanksListFilter />
        <BanksListTable />
      </ContentWrapper>
    </>
  );
};

export default BanksListPage;
