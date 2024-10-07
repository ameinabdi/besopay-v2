import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/payment/importer/paymentImporterActions';
import fields from 'src/modules/payment/importer/paymentImporterFields';
import selectors from 'src/modules/payment/importer/paymentImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.payment.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.payment.menu'), '/payment'],
          [i18n('entities.payment.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.payment.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default PaymentImportPage;
