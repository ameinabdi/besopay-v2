import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentMethod/view/paymentMethodViewActions';
import selectors from 'src/modules/paymentMethod/view/paymentMethodViewSelectors';
import PaymentMethodView from 'src/view/paymentMethod/view/PaymentMethodView';
import PaymentMethodViewToolbar from 'src/view/paymentMethod/view/PaymentMethodViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentMethodPage = (props) => {
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
          [i18n('entities.paymentMethod.menu'), '/payment-method'],
          [i18n('entities.paymentMethod.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.paymentMethod.view.title')}
        </PageTitle>

        <PaymentMethodViewToolbar match={match} />

        <PaymentMethodView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default PaymentMethodPage;
