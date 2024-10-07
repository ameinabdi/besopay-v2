import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/invoiceItems/view/invoiceItemsViewActions';
import selectors from 'src/modules/invoiceItems/view/invoiceItemsViewSelectors';
import InvoiceItemsView from 'src/view/invoiceItems/view/InvoiceItemsView';
import InvoiceItemsViewToolbar from 'src/view/invoiceItems/view/InvoiceItemsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const InvoiceItemsPage = (props) => {
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
          [i18n('entities.invoiceItems.menu'), '/invoice-items'],
          [i18n('entities.invoiceItems.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.invoiceItems.view.title')}
        </PageTitle>

        <InvoiceItemsViewToolbar match={match} />

        <InvoiceItemsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default InvoiceItemsPage;
