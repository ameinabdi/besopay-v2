import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import {useParams } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/businessDocuments/view/businessDocumentsViewActions';
import selectors from 'src/modules/businessDocuments/view/businessDocumentsViewSelectors';
import BusinessDocumentsView from 'src/view/businessDocuments/view/BusinessDocumentsView';
import BusinessDocumentsViewToolbar from 'src/view/businessDocuments/view/BusinessDocumentsViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const BusinessDocumentsPage = (props) => {
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
          [i18n('entities.businessDocuments.menu'), '/business-documents'],
          [i18n('entities.businessDocuments.view.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.businessDocuments.view.title')}
        </PageTitle>

        <BusinessDocumentsViewToolbar match={match} />

        <BusinessDocumentsView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default BusinessDocumentsPage;
