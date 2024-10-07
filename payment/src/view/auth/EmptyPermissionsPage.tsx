import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import React from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import selectors from 'src/modules/auth/authSelectors';

function EmptyPermissionsPage(props) {
  const dispatch = useAppDispatch();

  const backgroundImageUrl = useAppSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useAppSelector(selectors.selectLogoUrl);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emptyPermissions.jpg'
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

        <h3>{i18n('auth.emptyPermissions.message')}</h3>

        <OtherActions>
          <ButtonLink onClick={doSignout}>
            {i18n('auth.signout')}
          </ButtonLink>
        </OtherActions>
      </Content>
    </Wrapper>
  );
}

export default EmptyPermissionsPage;
