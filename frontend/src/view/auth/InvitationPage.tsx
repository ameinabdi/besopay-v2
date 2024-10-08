import { i18n } from 'src/i18n';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';

import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import Spinner from 'src/view/shared/Spinner';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import authActions from 'src/modules/auth/authActions';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import selectors from 'src/modules/auth/authSelectors';

function InviationPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const backgroundImageUrl = useAppSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useAppSelector(selectors.selectLogoUrl);

  const loading = useAppSelector(
    invitationSelectors.selectLoading,
  );
  const warningMessage = useAppSelector(
    invitationSelectors.selectWarningMessage,
  );

  const token = queryString.parse(location.search).token;

  useEffect(() => {
    dispatch(invitationActions.doAcceptFromAuth(token));
  }, [dispatch, token]);

  const doAcceptWithWrongEmail = () => {
    dispatch(
      invitationActions.doAcceptFromAuth(token, true),
    );
  };

  const doSignout = async () => {
    await dispatch(authActions.doSignout());
    navigate('/');
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/invitation.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
          {logoUrl ? (
            <img
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            />
          ) : (
            <h1>{i18n('app.title')}</h1>
          )}
        </Logo>

        {loading && <Spinner />}

        {Boolean(warningMessage) && (
          <h3
            style={{
              textAlign: 'center',
            }}
          >
            {warningMessage}
          </h3>
        )}

        {Boolean(warningMessage) && (
          <Button
            style={{ marginTop: '24px' }}
            onClick={doAcceptWithWrongEmail}
            type="primary"
            size="large"
            block
            htmlType="button"
            loading={loading}
          >
            {i18n('tenant.invitation.acceptWrongEmail')}
          </Button>
        )}

        {!loading && (
          <Button
            style={{ marginTop: '24px' }}
            htmlType="button"
            block
            size="large"
            onClick={doSignout}
          >
            {i18n('auth.signout')}
          </Button>
        )}
      </Content>
    </Wrapper>
  );
}

export default InviationPage;
