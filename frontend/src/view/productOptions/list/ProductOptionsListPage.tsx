import React from 'react';
import { i18n } from 'src/i18n';
import ProductOptionsListFilter from 'src/view/productOptions/list/ProductOptionsListFilter';
import ProductOptionsListTable from 'src/view/productOptions/list/ProductOptionsListTable';
import ProductOptionsListToolbar from 'src/view/productOptions/list/ProductOptionsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProductOptionsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.productOptions.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.productOptions.list.title')}
        </PageTitle>

        <ProductOptionsListToolbar />
        <ProductOptionsListFilter />
        <ProductOptionsListTable />
      </ContentWrapper>
    </>
  );
};

export default ProductOptionsListPage;
