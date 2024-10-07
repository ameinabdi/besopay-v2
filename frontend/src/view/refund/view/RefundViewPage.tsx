import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/refund/view/refundViewActions';
import selectors from 'src/modules/refund/view/refundViewSelectors';
import RefundView from 'src/view/refund/view/RefundView';
import RefundViewToolbar from 'src/view/refund/view/RefundViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const RefundPage = (props) => {
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
          [i18n('entities.refund.menu'), '/refund'],
          [i18n('entities.refund.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.refund.view.title')}
        </PageTitle>

        <RefundViewToolbar match={match} />

        <RefundView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default RefundPage;
