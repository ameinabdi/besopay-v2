import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/currency/importer/currencyImporterActions';
import fields from 'src/modules/currency/importer/currencyImporterFields';
import selectors from 'src/modules/currency/importer/currencyImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const CurrencyImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.currency.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.currency.menu'), '/currency'],
          [i18n('entities.currency.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.currency.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default CurrencyImportPage;
