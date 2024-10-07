import React from 'react';
import { i18n } from 'src/i18n';
import WithdrawListFilter from 'src/view/withdraw/list/WithdrawListFilter';
import WithdrawListTable from 'src/view/withdraw/list/WithdrawListTable';
import WithdrawListToolbar from 'src/view/withdraw/list/WithdrawListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const WithdrawListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.withdraw.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.withdraw.list.title')}
        </PageTitle>

        <WithdrawListToolbar />
        <WithdrawListFilter />
        <WithdrawListTable />
      </ContentWrapper>
    </>
  );
};

export default WithdrawListPage;
