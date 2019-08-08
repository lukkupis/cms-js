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

function Pages() {
  const cmsStore = useSelector(state => state.cmsStore);

  useEffect(() => {
    cmsStore.userAdminName === '' && Router.push('/login');
  }, [cmsStore.userAdminName]);

  return (
    <>
      <Head>
        <title>Panel - Pages</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu />

        <AdminContent>
          <AdminHeader
            name="Pages"
            buttonLabel="Add Page"
            buttonLink="page-new"
            startedState={cmsStore.GET_PAGES_STARTED}
          />

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
              buttons={[
                { label: 'Edit', link: '' },
                { label: 'Delete', action: () => {} }
              ]}
            />
          )}
        </AdminContent>
      </AdminMain>
    </>
  );
}

Pages.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);

  if (req) {
    store.dispatch(cmsActions.SET_PAGES_SERVER(query.data));
  } else {
    store.dispatch(cmsActions.GET_PAGES());
  }
  return { isServer };
};

export default Pages;
