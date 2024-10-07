import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/store/view/storeViewActions';
import selectors from 'src/modules/store/view/storeViewSelectors';
import StoreView from 'src/view/store/view/StoreView';
import StoreViewToolbar from 'src/view/store/view/StoreViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const StorePage = (props) => {
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
          [i18n('entities.store.menu'), '/store'],
          [i18n('entities.store.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.store.view.title')}
        </PageTitle>

        <StoreViewToolbar match={match} />

        <StoreView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default StorePage;
