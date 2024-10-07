import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/businessAccounts/importer/businessAccountsImporterActions';
import fields from 'src/modules/businessAccounts/importer/businessAccountsImporterFields';
import selectors from 'src/modules/businessAccounts/importer/businessAccountsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessAccountsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.businessAccounts.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.businessAccounts.menu'), '/business-accounts'],
          [i18n('entities.businessAccounts.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.businessAccounts.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default BusinessAccountsImportPage;
