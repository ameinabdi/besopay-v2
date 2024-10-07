import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/businessDocuments/importer/businessDocumentsImporterActions';
import fields from 'src/modules/businessDocuments/importer/businessDocumentsImporterFields';
import selectors from 'src/modules/businessDocuments/importer/businessDocumentsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessDocumentsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.businessDocuments.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.businessDocuments.menu'), '/business-documents'],
          [i18n('entities.businessDocuments.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.businessDocuments.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default BusinessDocumentsImportPage;
