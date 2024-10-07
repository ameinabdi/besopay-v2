import React from 'react';
import { i18n } from 'src/i18n';
import ShippingListFilter from 'src/view/shipping/list/ShippingListFilter';
import ShippingListTable from 'src/view/shipping/list/ShippingListTable';
import ShippingListToolbar from 'src/view/shipping/list/ShippingListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ShippingListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.shipping.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.shipping.list.title')}
        </PageTitle>

        <ShippingListToolbar />
        <ShippingListFilter />
        <ShippingListTable />
      </ContentWrapper>
    </>
  );
};

export default ShippingListPage;
