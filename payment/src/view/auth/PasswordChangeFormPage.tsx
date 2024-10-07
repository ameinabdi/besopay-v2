import React from 'react';
import { i18n } from 'src/i18n';
import { useNavigate } from 'react-router-dom';
import PasswordChangeForm from 'src/view/auth/PasswordChangeForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function PasswordChangeFormPage(props) {
  const navigate = useNavigate()

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('auth.passwordChange.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('auth.passwordChange.title')}
        </PageTitle>

        <PasswordChangeForm
          onCancel={() => navigate(-1)}
        />
      </ContentWrapper>
    </>
  );
}

export default PasswordChangeFormPage;
