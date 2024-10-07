import React from 'react';
import { i18n } from 'src/i18n';
import CategoryListFilter from 'src/view/category/list/CategoryListFilter';
import CategoryListTable from 'src/view/category/list/CategoryListTable';
import CategoryListToolbar from 'src/view/category/list/CategoryListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const CategoryListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.category.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.category.list.title')}
        </PageTitle>

        <CategoryListToolbar />
        <CategoryListFilter />
        <CategoryListTable />
      </ContentWrapper>
    </>
  );
};

export default CategoryListPage;
