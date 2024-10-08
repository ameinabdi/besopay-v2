import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentLink/importer/paymentLinkImporterActions';
import fields from 'src/modules/paymentLink/importer/paymentLinkImporterFields';
import selectors from 'src/modules/paymentLink/importer/paymentLinkImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentLinkImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.paymentLink.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.paymentLink.menu'), '/payment-link'],
          [i18n('entities.paymentLink.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.paymentLink.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default PaymentLinkImportPage;
