import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/invoice/view/invoiceViewActions';
import selectors from 'src/modules/invoice/view/invoiceViewSelectors';
import InvoiceView from 'src/view/invoice/view/InvoiceView';
import InvoiceViewToolbar from 'src/view/invoice/view/InvoiceViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const InvoicePage = (props) => {
 const dispatch = useAppDispatch();
  const match =useParams();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.invoice.menu'), '/invoice'],
          [i18n('entities.invoice.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.invoice.view.title')}
        </PageTitle>

        <InvoiceViewToolbar match={match} />

        <InvoiceView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default InvoicePage;
