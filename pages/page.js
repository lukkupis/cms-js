import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import initialCheckAuth from 'helpers/initialCheckAuth';

import * as cmsPageActions from 'actions/cmsPageActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Home(props) {
  const cmsPageStore = useSelector(state => state.cmsPageStore);
  const page = cmsPageStore.currentPageData;

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
    store.dispatch(cmsPageActions.SET_PAGE_DATA_SERVER(query.data));
  } else {
    store.dispatch(cmsPageActions.RESET_PAGE_DATA());
    store.dispatch(cmsPageActions.GET_PAGE_DATA(query.slug));
  }

  return { isServer };
};

export default Home;
