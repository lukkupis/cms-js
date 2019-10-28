import React from 'react';
import { useSelector } from 'react-redux';
import initialCheckAuth from 'helpers/initialCheckAuth';

import * as cmsActions from 'actions/cmsActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Home(props) {
  const cmsStore = useSelector(state => state.cmsStore);
  const page = cmsStore.currentPageData;

  return (
    <>
      <Head>
        <title>{page.title ? page.title : '...'}</title>
      </Head>
      <Header />
      {page.slug && (
        <div className="container mt-5">
          <h1>{page.title}</h1>
          <div className="mb-4">{page.author.name}</div>

          {page.content}
        </div>
      )}
    </>
  );
}

Home.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);

  if (req) {
    store.dispatch(cmsActions.SET_PAGE_DATA_SERVER());
  } else {
    store.dispatch(cmsActions.GET_PAGE_DATA(query.slug));
  }

  return { isServer };
};

export default Home;
