import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentMethod/importer/paymentMethodImporterActions';
import fields from 'src/modules/paymentMethod/importer/paymentMethodImporterFields';
import selectors from 'src/modules/paymentMethod/importer/paymentMethodImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentMethodImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.paymentMethod.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.paymentMethod.menu'), '/payment-method'],
          [i18n('entities.paymentMethod.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.paymentMethod.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default PaymentMethodImportPage;
