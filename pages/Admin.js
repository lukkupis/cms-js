import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import * as cmsActions from 'actions/cmsActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Admin() {
  const cmsStore = useSelector(state => state.cmsStore);

  useEffect(() => {
    cmsStore.GET_PAGES_FAILED && Router.push('/login');
  }, [cmsStore.GET_PAGES_FAILED]);

  return (
    <div className="container">
      <Head>
        <title>Panel</title>
      </Head>
      <Header />
      {(cmsStore.SET_PAGES_SUCCEEDED || cmsStore.GET_PAGES_SUCCEEDED) && (
        <div>
          <h2>Strony:</h2>
          {cmsStore.GET_PAGES_STARTED && 'Loading...'}
          {cmsStore.pages.map(item => (
            <div key={item._id}>
              <div>{item.author}</div>
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Admin.getInitialProps = async ({ req, query, store, isServer }) => {
  if (req) {
    store.dispatch(cmsActions.SET_PAGES_SERVER(query.data));
  } else {
    store.dispatch(cmsActions.GET_PAGES());
  }
  return { isServer };
};

export default Admin;
