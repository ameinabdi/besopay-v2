import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/country/view/countryViewActions';
import selectors from 'src/modules/country/view/countryViewSelectors';
import CountryView from 'src/view/country/view/CountryView';
import CountryViewToolbar from 'src/view/country/view/CountryViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const CountryPage = (props) => {
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
          [i18n('entities.country.menu'), '/country'],
          [i18n('entities.country.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.country.view.title')}
        </PageTitle>

        <CountryViewToolbar match={match} />

        <CountryView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default CountryPage;
