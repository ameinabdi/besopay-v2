import React from 'react';
import { i18n } from 'src/i18n';
import RefundListFilter from 'src/view/refund/list/RefundListFilter';
import RefundListTable from 'src/view/refund/list/RefundListTable';
import RefundListToolbar from 'src/view/refund/list/RefundListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const RefundListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.refund.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.refund.list.title')}
        </PageTitle>

        <RefundListToolbar />
        <RefundListFilter />
        <RefundListTable />
      </ContentWrapper>
    </>
  );
};

export default RefundListPage;
