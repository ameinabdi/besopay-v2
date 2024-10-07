import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import React from 'react';
import config from 'src/config';

import {
  DashboardOutlined,
  UserAddOutlined,
  FileSearchOutlined,
  SettingOutlined,
  RightOutlined,
  CreditCardOutlined,
  ControlOutlined
} from '@ant-design/icons';
import { Divider } from 'antd'
const permissions = Permissions.values;

export default [
  {
    path: '/',
    type: 'Main',
    exact: true,
    icon: <DashboardOutlined />,
    label: i18n('dashboard.menu'),
    permissionRequired: null,
  },
  {
    path: '/devider',
    permissionRequired: permissions.businessAccountsRead,
    icon: null,
    label: (
      <Divider  orientation="center" variant="dashed" style={{ borderColor: '#878e97', color:'#878e97', fontSize:12 }}>Your Business</Divider>
    ),
  },
  {
    path: '/business-accounts',
    permissionRequired: permissions.businessAccountsRead,
    icon: <RightOutlined />,
    label: i18n('entities.businessAccounts.menu'),
  },
  {
    path: '/customer',
    permissionRequired: permissions.customerRead,
    icon: <RightOutlined />,
    label: i18n('entities.customer.menu'),
  },
  {
    path: '/transaction',
    permissionRequired: permissions.transactionRead,
    icon: <RightOutlined />,
    label: i18n('entities.transaction.menu'),
  },
  {
    path: '/devider',
    permissionRequired: permissions.businessAccountsRead,
    icon: null,
    label: (
      <Divider  orientation="center" variant="dashed" style={{ borderColor: '#878e97', color:'#878e97',fontSize:12  }}>Payments</Divider>
    ),
  },
  {
    path: '/payment-link',
    permissionRequired: permissions.paymentLinkRead,
    icon: <RightOutlined />,
    label: i18n('entities.paymentLink.menu'),
  },

  {
    path: '/invoice',
    permissionRequired: permissions.invoiceRead,
    icon: <RightOutlined />,
    label: i18n('entities.invoice.menu'),
  },

  

  {
    path: '/withdraw',
    permissionRequired: permissions.withdrawRead,
    icon: <RightOutlined />,
    label: i18n('entities.withdraw.menu'),
  },
  
].filter(Boolean);