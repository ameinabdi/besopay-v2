import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'src/modules/hook';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import TenantNewForm from 'src/view/auth/TenantNewForm';
import TenantSelectForm from 'src/view/auth/TenantSelectForm';
import ButtonLink from 'src/view/shared/styles/ButtonLink';

function TenantPage() {
  const [view, setView] = useState('form');
  const dispatch = useAppDispatch();

  const invitedTenants = useAppSelector(
    selectors.selectInvitedTenants,
  );
  const backgroundImageUrl = useAppSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useAppSelector(selectors.selectLogoUrl);

  useEffect(() => {
    setView(invitedTenants.length ? 'select' : 'form');
  }, [invitedTenants]);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doToggleView = () => {
    setView((prevView) =>
      prevView === 'form' ? 'select' : 'form',
    );
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/tenant.jpg'
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

        {view === 'form' ? (
          <TenantNewForm onViewToggle={doToggleView} />
        ) : (
          <TenantSelectForm onViewToggle={doToggleView} />
        )}

        <OtherActions>
          <ButtonLink onClick={doSignout}>
            {i18n('auth.signout')}
          </ButtonLink>
        </OtherActions>
      </Content>
    </Wrapper>
  );
}

export default TenantPage;
