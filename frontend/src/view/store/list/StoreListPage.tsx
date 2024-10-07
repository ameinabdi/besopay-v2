import React from 'react';
import { i18n } from 'src/i18n';
import StoreListFilter from 'src/view/store/list/StoreListFilter';
import StoreListTable from 'src/view/store/list/StoreListTable';
import StoreListToolbar from 'src/view/store/list/StoreListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const StoreListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.store.menu')],
        ]}
      />

      <ContentWrapper>
      <div className='flex flex-row justify-between'>
        <PageTitle>
          {i18n('entities.store.list.title')}
        </PageTitle>

        <StoreListToolbar />
      </div>
        <StoreListFilter />
        <StoreListTable />
      </ContentWrapper>
    </>
  );
};

export default StoreListPage;
