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

function Admin() {
  const cmsStore = useSelector(state => state.cmsStore);

  useEffect(() => {
    cmsStore.userAdminName === '' && Router.push('/login');
  }, [cmsStore.userAdminName]);

  return (
    <>
      <Head>
        <title>Panel</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu />

        <div className="flex-grow-1 px-5">
          <div className="d-flex align-items-center">
            <h1 className="my-5">Pages</h1>
            <a href="#" className="btn btn-dark ml-4">
              Add Page
            </a>
          </div>

          {cmsStore.GET_PAGES_STARTED && 'Loading...'}

          {(cmsStore.SET_PAGES_SUCCEEDED || cmsStore.GET_PAGES_SUCCEEDED) && (
            <AdminList
              list={cmsStore.pages}
              columns={[
                { label: 'title', content: 'title' },
                {
                  label: 'author',
                  content: ['author', 'name'],
                  type: 'object'
                },
                { label: 'created', content: 'created', type: 'date' },
                { label: 'status', content: 'status' }
              ]}
            />
          )}
        </div>
      </AdminMain>
    </>
  );
}

Admin.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);

  if (req) {
    store.dispatch(cmsActions.SET_PAGES_SERVER(query.data));
  } else {
    const userAdminName = store.getState().cmsStore.userAdminName;

    if (userAdminName != '') {
      store.dispatch(cmsActions.GET_PAGES());
    }
  }
  return { isServer };
};

export default Admin;
