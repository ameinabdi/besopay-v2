import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/invoiceItems/importer/invoiceItemsImporterActions';
import fields from 'src/modules/invoiceItems/importer/invoiceItemsImporterFields';
import selectors from 'src/modules/invoiceItems/importer/invoiceItemsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const InvoiceItemsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.invoiceItems.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.invoiceItems.menu'), '/invoice-items'],
          [i18n('entities.invoiceItems.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.invoiceItems.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default InvoiceItemsImportPage;
