import React from 'react';
import {  Tabs } from 'antd';
import UserTab from 'src/view/admin/UserTab/UserTab';
import ContentWrapper from '../layout/styles/ContentWrapper';
import RolesListPage from 'src/view/admin/RoleListTab/RolesListTab';
import PermissionListTab from 'src/view/admin/PermissionListTab/PermissionListTab';

const UserPage = (props) => {
  return (
    <ContentWrapper>
      <Tabs
        defaultActiveKey="1"
        size='middle'
        items={[
          {
            label: `Roles`,
            key: '1', 
            children:(<RolesListPage />),
          },
          {
            label: `Permissions`,
            key: '2', 
            children:(<PermissionListTab />),
          },
          {
            label: `Users`,
            key: '3', 
            children:(<UserTab />),
          }
        ]}
      />
    </ContentWrapper>
  );
};

export default UserPage;
