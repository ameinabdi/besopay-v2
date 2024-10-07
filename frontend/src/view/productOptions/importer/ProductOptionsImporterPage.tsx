import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productOptions/importer/productOptionsImporterActions';
import fields from 'src/modules/productOptions/importer/productOptionsImporterFields';
import selectors from 'src/modules/productOptions/importer/productOptionsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProductOptionsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.productOptions.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.productOptions.menu'), '/product-options'],
          [i18n('entities.productOptions.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.productOptions.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default ProductOptionsImportPage;
