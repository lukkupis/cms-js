import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import initialCheckAuth from 'helpers/initialCheckAuth';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminList from 'components/organisms/AdminList/AdminList';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
import AdminHeader from 'components/molecules/AdminHeader';

function Users() {
  const cmsUserStore = useSelector(state => state.cmsUserStore);

  useEffect(() => {
    cmsUserStore.userAdminName === '' && Router.push('/login');
  }, [cmsUserStore.userAdminName]);

  return (
    <>
      <Head>
        <title>Panel - Users</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu />

        <AdminContent>
          <AdminHeader
            name="Users"
            buttonLabel="Add User"
            buttonLink="user-new"
            startedState={cmsPageStore.GET_USERS_STARTED}
          />

          {(cmsUserStore.SET_USERS_SUCCEEDED ||
            cmsUserStore.GET_USERS_SUCCEEDED) && (
            <AdminList
              list={cmsUserStore.users}
              columns={[
                { label: 'login', content: 'login' },
                { label: 'name', content: 'name' },
                { label: 'email', content: 'email' },
                { label: 'registered', content: 'registered', type: 'date' },
                { label: 'permissions', content: 'permissions' }
              ]}
              buttons={(itemId, itemTitle) => [
                {
                  label: 'Edit',
                  link: `/admin/user-new?action=edit&id=${itemId}`
                },
                {
                  label: 'Delete',
                  action: () => {}
                }
              ]}
            />
          )}
        </AdminContent>
      </AdminMain>
    </>
  );
}

Users.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);

  if (req) {
    store.dispatch(cmsUserActions.SET_USERS_SERVER(query.data));
  } else {
    store.dispatch(cmsUserActions.GET_USERS());
  }
  return { isServer };
};

export default Users;
