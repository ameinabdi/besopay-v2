import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/invoice/importer/invoiceImporterActions';
import fields from 'src/modules/invoice/importer/invoiceImporterFields';
import selectors from 'src/modules/invoice/importer/invoiceImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const InvoiceImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.invoice.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.invoice.menu'), '/invoice'],
          [i18n('entities.invoice.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.invoice.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default InvoiceImportPage;
