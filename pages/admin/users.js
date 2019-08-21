import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import * as cmsActions from 'actions/cmsActions';
import initialCheckAuth from 'helpers/initialCheckAuth';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminList from 'components/organisms/AdminList/AdminList';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
import AdminHeader from 'components/molecules/AdminHeader';

function Users() {
  const cmsStore = useSelector(state => state.cmsStore);

  useEffect(() => {
    cmsStore.userAdminName === '' && Router.push('/login');
  }, [cmsStore.userAdminName]);

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
            startedState={cmsStore.GET_USERS_STARTED}
          />

          {(cmsStore.SET_USERS_SUCCEEDED || cmsStore.GET_USERS_SUCCEEDED) && (
            <AdminList
              list={cmsStore.users}
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
    store.dispatch(cmsActions.SET_USERS_SERVER(query.data));
  } else {
    store.dispatch(cmsActions.GET_USERS());
  }
  return { isServer };
};

export default Users;
