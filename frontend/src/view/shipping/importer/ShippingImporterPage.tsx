import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/shipping/importer/shippingImporterActions';
import fields from 'src/modules/shipping/importer/shippingImporterFields';
import selectors from 'src/modules/shipping/importer/shippingImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ShippingImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.shipping.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.shipping.menu'), '/shipping'],
          [i18n('entities.shipping.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.shipping.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default ShippingImportPage;
