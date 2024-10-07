import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/business/view/businessViewActions';
import selectors from 'src/modules/business/view/businessViewSelectors';
import BusinessView from 'src/view/business/view/BusinessView';
import BusinessViewToolbar from 'src/view/business/view/BusinessViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessPage = (props) => {
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
          [i18n('entities.business.menu'), '/business'],
          [i18n('entities.business.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.business.view.title')}
        </PageTitle>

        <BusinessViewToolbar match={match} />

        <BusinessView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default BusinessPage;
