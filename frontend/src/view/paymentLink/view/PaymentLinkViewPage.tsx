import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/paymentLink/view/paymentLinkViewActions';
import selectors from 'src/modules/paymentLink/view/paymentLinkViewSelectors';
import PaymentLinkView from 'src/view/paymentLink/view/PaymentLinkView';
import PaymentLinkViewToolbar from 'src/view/paymentLink/view/PaymentLinkViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PaymentLinkPage = (props) => {
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
     <PaymentLinkView loading={loading} record={record} />
    </>
  );
};

export default PaymentLinkPage;
