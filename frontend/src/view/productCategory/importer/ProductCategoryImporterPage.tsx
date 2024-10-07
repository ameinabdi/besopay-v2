import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productCategory/importer/productCategoryImporterActions';
import fields from 'src/modules/productCategory/importer/productCategoryImporterFields';
import selectors from 'src/modules/productCategory/importer/productCategoryImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProductCategoryImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.productCategory.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.productCategory.menu'), '/product-category'],
          [i18n('entities.productCategory.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.productCategory.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default ProductCategoryImportPage;
