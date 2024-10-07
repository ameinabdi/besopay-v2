import { Layout, Menu, Typography } from 'antd';
import React, { useEffect } from 'react';
import SiderWrapper from 'src/view/layout/styles/SiderWrapper';
import { useNavigate, Link } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/modules/hook';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import menus from 'src/view/menus';
import { i18n } from 'src/i18n';

import type { MenuProps } from 'antd';
const { Text } = Typography;
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getGroup(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label:<Text style={{color:'#6E7276'}} strong>{label}</Text>,
    type,
    style:{ marginTop: 'auto', display: 'hidden' }
  } as MenuItem;
}
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const AppMenu = (props) => {
  const navigate = useNavigate();
 const dispatch = useAppDispatch();
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const currentPermission = useSelector(
    authSelectors.selectPermissionCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );
  const logoUrl = useSelector(authSelectors.selectLogoUrl);

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
    currentPermission
  );
 
  const toggleMenuOnResize = () => {
    window.innerWidth < 576 ? hideMenu() : showMenu();
  };

  useEffect(() => {
    toggleMenuOnResize();
    window.addEventListener('resize', toggleMenuOnResize);

    return () => {
      window.removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedKeys = () => {
    const url = props.url;
    const match = menus.find((option) => {
      if (option.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }
  };

  const hideMenu = () => {
    dispatch(actions.doHideMenu());
  };

  const showMenu = () => {
    dispatch(actions.doShowMenu());
  };
  
  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const menu:MenuProps['items'] = [
   ...menus.filter((menu) => match(menu.permissionRequired),).map((menu) => (getItem(menu.label, menu.path, menu.icon,)))
  ]
  const bottomMenu:MenuProps['items'] = [
    getGroup('Setting', '2', null, [{ type: 'divider',style:{backgroundColor:'#303C48', alignItems:'flex-end' } }, ...menus
    .filter((menu) =>
    menu.type === 'Setting',
    )
    .map((menu) => (getItem(menu.label, menu.path, menu.icon,)))], 'group'),
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <SiderWrapper
      style={{
        display: menuVisible ? 'block' : 'none',
      }}
    >
      <Sider theme="dark" trigger={null}>
        <div className="logo">
          {logoUrl ? (
            <Link to="/">
              <img
                src={logoUrl}
                width="164px"
                alt={i18n('app.title')}
              />
            </Link>
          ) : (
            <h2>
              <Link to="/">{i18n('app.title')}</Link>
            </h2>
          )}
        </div>
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys()}
        items={menu}
        />
     </Sider>
    </SiderWrapper>
  );
};

export default AppMenu;
