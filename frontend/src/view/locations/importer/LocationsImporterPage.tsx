import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/locations/importer/locationsImporterActions';
import fields from 'src/modules/locations/importer/locationsImporterFields';
import selectors from 'src/modules/locations/importer/locationsImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const LocationsImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.locations.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.locations.menu'), '/locations'],
          [i18n('entities.locations.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.locations.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default LocationsImportPage;
