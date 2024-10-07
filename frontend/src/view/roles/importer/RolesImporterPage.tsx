import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/roles/importer/rolesImporterActions';
import fields from 'src/modules/roles/importer/rolesImporterFields';
import selectors from 'src/modules/roles/importer/rolesImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const RolesImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.roles.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.roles.menu'), '/roles'],
          [i18n('entities.roles.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.roles.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default RolesImportPage;
