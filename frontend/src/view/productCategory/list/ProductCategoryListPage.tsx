import React from 'react';
import { i18n } from 'src/i18n';
import ProductCategoryListFilter from 'src/view/productCategory/list/ProductCategoryListFilter';
import ProductCategoryListTable from 'src/view/productCategory/list/ProductCategoryListTable';
import ProductCategoryListToolbar from 'src/view/productCategory/list/ProductCategoryListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProductCategoryListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.productCategory.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.productCategory.list.title')}
        </PageTitle>

        <ProductCategoryListToolbar />
        <ProductCategoryListFilter />
        <ProductCategoryListTable />
      </ContentWrapper>
    </>
  );
};

export default ProductCategoryListPage;
