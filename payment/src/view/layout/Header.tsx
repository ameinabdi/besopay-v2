import {
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  UserOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { useAppSelector, useAppDispatch} from 'src/modules/hook';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import { useNavigate } from 'react-router-dom';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import config from 'src/config';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';
import MainMenu from 'src/view/layout/Menu';

const { Header: AntHeader } = Layout;

const Header = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const menuVisible = useAppSelector(
    layoutSelectors.selectMenuVisible,
  );
  const currentTenant = useAppSelector(
    authSelectors.selectCurrentTenant,
  );
  const userDropdownText = useAppSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userDropdownAvatar = useAppSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  
  const onNotificationClick = (message) => {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  const doSignout = () => {
    dispatch(authActions.doSignout())
  };

  const doNavigateToProfile = () => {
    navigate('/profile');
  };

  const doNavigateToPasswordChange = () => {
    navigate('/password-change');
  };

  const doNavigateToTenants = () => {
    navigate('/tenant');
  };

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userMenu = (
    <Menu selectedKeys={[]}>
      <Menu.Item
        onClick={doNavigateToProfile}
        key="userCenter"
      >
        <UserOutlined />
        {i18n('auth.profile.title')}
      </Menu.Item>
      <Menu.Item
        onClick={doNavigateToPasswordChange}
        key="passwordChange"
      >
        <LockOutlined />
        {i18n('auth.passwordChange.title')}
      </Menu.Item>
      {['multi', 'multi-with-subdomain'].includes(
        config.tenantMode,
      ) && (
        <Menu.Item
          onClick={doNavigateToTenants}
          key="tenants"
        >
          <AppstoreOutlined />
          {i18n('auth.tenants')}
        </Menu.Item>
      )}
      {config.apiDocumentationUrl && (
        <Menu.Item key="api">
          <a
            href={config.apiDocumentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <CodeOutlined style={{ marginRight: 8 }} />
            {i18n('api.menu')}
          </a>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item onClick={doSignout} key="logout">
        <LogoutOutlined />
        {i18n('auth.signout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <AntHeader>
        {menuVisible ? (
          <MenuFoldOutlined
            className="trigger"
            onClick={doToggleMenu}
          />
        ) : (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={doToggleMenu}
          />
        )}
        <div className="header-right">
          
          <span className="i18n-select">
            <I18nSelect />
          </span>

          <Dropdown
            className="user-dropdown"
            overlay={userMenu}
            trigger={['click']}
          >
            <div className="user-dropdown-content">
              <Avatar
                className="user-dropdown-avatar"
                size="small"
                src={userDropdownAvatar || undefined}
                alt="avatar"
                icon={
                  userDropdownAvatar ? undefined : (
                    <UserOutlined />
                  )
                }
              />
              <span className="user-dropdown-text">
                <span>{userDropdownText}</span>{' '}
                {['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                  <span className="user-dropdown-text-tenant">
                    {currentTenant && currentTenant.name}
                  </span>
                )}
              </span>
            </div>
          </Dropdown>
        </div>
      </AntHeader>
    </HeaderWrapper>
  );
};

export default Header;
