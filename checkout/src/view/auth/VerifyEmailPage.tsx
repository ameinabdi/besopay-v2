import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';
import { useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import selectors from 'src/modules/auth/authSelectors';

const VerifyEmailPage = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const token = queryString.parse(location.search).token;

  const backgroundImageUrl = useAppSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useAppSelector(selectors.selectLogoUrl);

  useEffect(() => {
    dispatch(actions.doVerifyEmail(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emailUnverified.jpg'
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

        <h3
          style={{
            textAlign: 'center',
          }}
        >
          {i18n('auth.verifyEmail.message')}
        </h3>
      </Content>
    </Wrapper>
  );
};

export default VerifyEmailPage;
