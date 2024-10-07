import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { useParams,
 } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/permission/form/permissionFormActions';
import selectors from 'src/modules/permission/form/permissionFormSelectors';
import PermissionForm from 'src/view/permission/form/PermissionForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { getHistory } from 'src/modules/store';

const PermissionFormPage = (props) => {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useAppDispatch();  
  const match = useParams
();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.id
);
  const title = isEditing
    ? i18n('entities.permission.edit.title')
    : i18n('entities.permission.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.id));
    setDispatched(true);
  }, [dispatch, match.id
]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <>
      <ContentWrapper>
        <PageTitle>{title}</PageTitle>

        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <PermissionForm
            saveLoading={saveLoading}
            record={record}
            isEditing={isEditing}
            onSubmit={doSubmit}
           onCancel={() => getHistory().push('/order')}

          />
        )}
      </ContentWrapper>
    </>
  );
};

export default PermissionFormPage;
