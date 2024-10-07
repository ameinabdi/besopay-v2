import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/banks/importer/banksImporterActions';
import fields from 'src/modules/banks/importer/banksImporterFields';
import selectors from 'src/modules/banks/importer/banksImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BanksImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.banks.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.banks.menu'), '/banks'],
          [i18n('entities.banks.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.banks.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default BanksImportPage;
