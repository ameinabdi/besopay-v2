import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
import config from 'src/config';

import {
  DashboardOutlined,
  UserAddOutlined,
  FileSearchOutlined,
  SettingOutlined,
  CreditCardOutlined,
  ControlOutlined
} from '@ant-design/icons';

const permissions = Permissions.values;

export default [
  {
    path: '/',
    type: 'Main',
    exact: true,
    icon: <DashboardOutlined />,
    label: i18n('dashboard.menu'),
    permissionRequired: null,
    entity:{
      name:'main',
      type: 'list'
    },
  },

  config.isPlanEnabled && {
    path: '/plan',
    type: 'Setting',
    permissionRequired: permissions.planRead,
    icon: <CreditCardOutlined />,
    label: i18n('plan.menu'),
    entity:{
      name:'plan',
      type: 'list'
    },
  },
  {
    path: '/admin',
    type: 'Setting',
    label: i18n('admin.menu'),
    permissionRequired: permissions.userRead,
    icon: <ControlOutlined />,
    entity:{
      name:'admin',
      type: 'list'
    },
  },
  {
    path: '/user',
    type: 'Setting',
    label: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <UserAddOutlined />,
    entity:{
      name:'user',
      type: 'list'
    },
  },

  {
    path: '/audit-logs',
    type: 'Setting',
    icon: <FileSearchOutlined />,
    label: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
    entity:{
      name:'audit',
      type: 'list'
    },
  },

  {
    path: '/settings',
    type: 'Setting',
    icon: <SettingOutlined />,
    label: i18n('settings.menu'),
    permissionRequired: permissions.settingsEdit,
    entity:{
      name:'setting',
      type: 'list'
    },
  },

  
].filter(Boolean);
