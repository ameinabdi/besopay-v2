import React, { useEffect } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';

import { useParams
 } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/roles/view/rolesViewActions';
import selectors from 'src/modules/roles/view/rolesViewSelectors';
import RolesView from 'src/view/roles/view/RolesView';
import RolesViewToolbar from 'src/view/roles/view/RolesViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

const RolesPage = (props) => {
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
          {i18n('entities.roles.view.title')}
        </PageTitle>

        <RolesViewToolbar match={match} />

        <RolesView loading={loading} record={record} />
      </ContentWrapper>
    </>
  );
};

export default RolesPage;
