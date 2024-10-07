import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/permission/importer/permissionImporterActions';
import fields from 'src/modules/permission/importer/permissionImporterFields';
import selectors from 'src/modules/permission/importer/permissionImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PermissionImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.permission.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.permission.menu'), '/permission'],
          [i18n('entities.permission.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.permission.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default PermissionImportPage;
