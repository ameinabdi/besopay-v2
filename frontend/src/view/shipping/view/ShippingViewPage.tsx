import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/shipping/view/shippingViewActions';
import selectors from 'src/modules/shipping/view/shippingViewSelectors';
import ShippingView from 'src/view/shipping/view/ShippingView';
import ShippingViewToolbar from 'src/view/shipping/view/ShippingViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ShippingPage = (props) => {
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
          [i18n('entities.shipping.menu'), '/shipping'],
          [i18n('entities.shipping.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.shipping.view.title')}
        </PageTitle>

        <ShippingViewToolbar match={match} />

        <ShippingView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default ShippingPage;
