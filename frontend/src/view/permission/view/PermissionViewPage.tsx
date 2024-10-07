import React, { useEffect } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { useParams
 } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/permission/view/permissionViewActions';
import selectors from 'src/modules/permission/view/permissionViewSelectors';
import PermissionView from 'src/view/permission/view/PermissionView';
import PermissionViewToolbar from 'src/view/permission/view/PermissionViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

const PermissionPage = (props) => {
  const dispatch = useAppDispatch();  
  const match = useParams
();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.id
));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ContentWrapper>
        <PageTitle>
          {i18n('entities.permission.view.title')}
        </PageTitle>

        <PermissionViewToolbar match={match} />

        <PermissionView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default PermissionPage;
