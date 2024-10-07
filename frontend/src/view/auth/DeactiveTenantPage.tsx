import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import { i18n, i18nHtml } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import OtherActions from 'src/view/auth/styles/OtherActions';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import LogoRow from './styles/RowLogo';
import { Typography }  from 'antd';

const DeactiveTenantPage = (props) => {
  const dispatch = useAppDispatch();
  const email = useSelector(
    selectors.selectCurrentUserEmail,
  );
  const currentTenant = useSelector(
    selectors.selectCurrentTenant,
  );
  const loading = useSelector(
    selectors.selectLoadingEmailConfirmation,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

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
        <LogoRow>
            <img
              src='/images/logo.png'
              width="80px"
              alt={i18n('app.title')}
            />
            <h1>{i18n('app.title')}</h1>
        </LogoRow>
        <img
              src='/images/403.svg'
              width="180px"
              alt={i18n('app.title')}
              style={{alignSelf:'center', marginTop:10,marginBottom:10}}
            />
        <Typography.Paragraph
          style={{
            textAlign: 'center',
          }}
        >
          {i18nHtml('auth.deactiveTenant.message', currentTenant?.name)}
        </Typography.Paragraph>

        <OtherActions>
          <ButtonLink onClick={doSignout}>
            {i18n('auth.signout')}
          </ButtonLink>
        </OtherActions>
      </Content>
    </Wrapper>
  );
};

export default DeactiveTenantPage;
