import React from 'react';
import { i18n } from 'src/i18n';
import LocationsListFilter from 'src/view/locations/list/LocationsListFilter';
import LocationsListTable from 'src/view/locations/list/LocationsListTable';
import LocationsListToolbar from 'src/view/locations/list/LocationsListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const LocationsListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.locations.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.locations.list.title')}
        </PageTitle>

        <LocationsListToolbar />
        <LocationsListFilter />
        <LocationsListTable />
      </ContentWrapper>
    </>
  );
};

export default LocationsListPage;
