import React from 'react'
import selectors from 'src/modules/auth/authSelectors';
import {useSelector } from 'react-redux';
import { Avatar, Tag, Divider,  } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { getHistory } from 'src/modules/store';
import {SettingOutlined, ContactsOutlined, ClusterOutlined,UserOutlined, ControlOutlined,LockOutlined, AppstoreOutlined, TagOutlined } from '@ant-design/icons';
import UserCard from 'src/view/accountCenter/styles/user';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
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

export default function AccountItem() {
    const currentUser = useSelector(
        selectors.selectCurrentUser,
      );
      const userDropdownAvatar = useSelector(
        selectors.selectCurrentUserAvatar,
      );
    const currentTenant = useSelector(
        selectors.selectCurrentTenant,
      );
    const currenctRoles =  useSelector(
        selectors.selectRoles,
      );
    const items: MenuItem[] = [
        getItem('Account Center', '/account-center', <SettingOutlined rev={undefined} />, ),
        getItem('Change Password', '/password-change', <LockOutlined rev={undefined}  />, ),
        getItem('Workspace', '/tenant', <AppstoreOutlined rev={undefined}  />, ),
        getItem('Admin Area', '/admin-area', <ControlOutlined rev={undefined}  />, ),
        
      ];

      const onClick: MenuProps['onClick'] = (e) => {
        getHistory().push(e.key);
      };
  return (
    <UserCard>
    {currentUser && (
      <div>
        <div className="avatarHolder">
          <Avatar
                className='avatarHolderImage'
                src={userDropdownAvatar || undefined}
                alt="avatar"
                icon={
                  userDropdownAvatar ? undefined : (
                    <UserOutlined rev={undefined}  />
                  )
                }
              />
          <div className="name">{currentUser?.fullName}</div>
          <div>{currenctRoles?.map((role)=>(<Tag color="processing">{role.roles}</Tag>))}</div>
        </div>
        <div className="detail">
        {currentUser?.phoneNumber && (
          <p>
          <ContactsOutlined
            rev={undefined}
            style={{
              marginRight: 8,
            }}
          />
          {currentUser?.phoneNumber}
        </p>
        )}
        {currentTenant?.name && (
          <p>
          <ClusterOutlined
            rev={undefined}
            style={{
              marginRight: 8,
            }}
          />
          {currentTenant?.name}
        </p>
        )}
        {currentUser.email && (
          <p>
          <TagOutlined
            rev={undefined}
            style={{
              marginRight: 8,
            }}
          />
          {currentUser.email}
        </p>
        )}
      </div>
        <Divider dashed />
        <Menu onClick={onClick} style={{ }} theme='light' mode="vertical" items={items} />
        <Divider style={{ marginTop: 16 }} dashed />
      </div>
    )}
  </UserCard>
  )
}

