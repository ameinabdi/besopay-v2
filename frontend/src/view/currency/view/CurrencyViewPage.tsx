import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/currency/view/currencyViewActions';
import selectors from 'src/modules/currency/view/currencyViewSelectors';
import CurrencyView from 'src/view/currency/view/CurrencyView';
import CurrencyViewToolbar from 'src/view/currency/view/CurrencyViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const CurrencyPage = (props) => {
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
          [i18n('entities.currency.menu'), '/currency'],
          [i18n('entities.currency.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.currency.view.title')}
        </PageTitle>

        <CurrencyViewToolbar match={match} />

        <CurrencyView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default CurrencyPage;
