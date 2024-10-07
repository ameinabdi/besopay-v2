import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/businessAccounts/view/businessAccountsViewActions';
import selectors from 'src/modules/businessAccounts/view/businessAccountsViewSelectors';
import BusinessAccountsView from 'src/view/businessAccounts/view/BusinessAccountsView';
import BusinessAccountsViewToolbar from 'src/view/businessAccounts/view/BusinessAccountsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessAccountsPage = (props) => {
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
          [i18n('entities.businessAccounts.menu'), '/business-accounts'],
          [i18n('entities.businessAccounts.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.businessAccounts.view.title')}
        </PageTitle>

        <BusinessAccountsViewToolbar match={match} />

        <BusinessAccountsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default BusinessAccountsPage;
