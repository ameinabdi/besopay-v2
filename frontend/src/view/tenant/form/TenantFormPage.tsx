import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import { useNavigate } from 'react-router-dom';
import actions from 'src/modules/tenant/form/tenantFormActions';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import TenantForm from 'src/view/tenant/form/TenantForm';
import { useParams } from 'react-router-dom';
import Spinner from 'src/view/shared/Spinner';

const TenantFormPage = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dispatched, setDispatched] = useState(false);
  const match = useParams();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.id);

  useEffect(() => {
    dispatch(actions.doInit(match.id));
    setDispatched(true);
  }, [dispatch, isEditing, match.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  const title = isEditing
    ? i18n('tenant.edit.title')
    : i18n('tenant.new.title');

  return (
    <>
      <Breadcrumb
        header
        items={[[i18n('tenant.menu'), '/tenant'], [title]]}
      />

      <ContentWrapper>
        <PageTitle>{title}</PageTitle>
        {initLoading && <Spinner />}
        {dispatched && !initLoading && (
          <TenantForm
            saveLoading={saveLoading}
            record={record}
            isEditing={isEditing}
            onSubmit={doSubmit}
            onCancel={() => navigate(-1)}
          />
        )}
      </ContentWrapper>
    </>
  );
};

export default TenantFormPage;
