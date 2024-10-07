import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/banks/view/banksViewActions';
import selectors from 'src/modules/banks/view/banksViewSelectors';
import BanksView from 'src/view/banks/view/BanksView';
import BanksViewToolbar from 'src/view/banks/view/BanksViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BanksPage = (props) => {
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
          [i18n('entities.banks.menu'), '/banks'],
          [i18n('entities.banks.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.banks.view.title')}
        </PageTitle>

        <BanksViewToolbar match={match} />

        <BanksView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default BanksPage;
