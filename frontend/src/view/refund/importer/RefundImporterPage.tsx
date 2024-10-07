import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/refund/importer/refundImporterActions';
import fields from 'src/modules/refund/importer/refundImporterFields';
import selectors from 'src/modules/refund/importer/refundImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const RefundImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.refund.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.refund.menu'), '/refund'],
          [i18n('entities.refund.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.refund.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default RefundImportPage;
