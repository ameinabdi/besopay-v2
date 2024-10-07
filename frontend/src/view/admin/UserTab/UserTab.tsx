import React from 'react';
import { i18n } from 'src/i18n';
import TopbarWrapper from 'src/view/layout/styles/TopbarWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import UserFilter from 'src/view/admin/UserTab/UserFilter';
import UserTable from 'src/view/admin/UserTab/UserTable';
import UserToolbar from 'src/view/admin/UserTab/UserToolbar';

const UserPage = (props) => {
  return (
    <>
        <TopbarWrapper>
          <PageTitle>{i18n('user.title')}</PageTitle>
          <UserToolbar />
        </TopbarWrapper>
        <UserFilter />
        <UserTable />
    </>
  );
};

export default UserPage;
