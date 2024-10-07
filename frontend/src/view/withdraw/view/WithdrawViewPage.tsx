import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/withdraw/view/withdrawViewActions';
import selectors from 'src/modules/withdraw/view/withdrawViewSelectors';
import WithdrawView from 'src/view/withdraw/view/WithdrawView';
import WithdrawViewToolbar from 'src/view/withdraw/view/WithdrawViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const WithdrawPage = (props) => {
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
          [i18n('entities.withdraw.menu'), '/withdraw'],
          [i18n('entities.withdraw.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.withdraw.view.title')}
        </PageTitle>

        <WithdrawViewToolbar match={match} />

        <WithdrawView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default WithdrawPage;
