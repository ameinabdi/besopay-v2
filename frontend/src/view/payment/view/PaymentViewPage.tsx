import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/payment/view/paymentViewActions';
import selectors from 'src/modules/payment/view/paymentViewSelectors';
import PaymentView from 'src/view/payment/view/PaymentView';
import PaymentViewToolbar from 'src/view/payment/view/PaymentViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentPage = (props) => {
 const dispatch = useAppDispatch();
  const match =useParams();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.id || props.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.payment.menu'), '/payment'],
          [i18n('entities.payment.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.payment.view.title')}
        </PageTitle>

        <PaymentViewToolbar match={match} />

        <PaymentView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default PaymentPage;
