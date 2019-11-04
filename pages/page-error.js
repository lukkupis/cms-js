import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import initialCheckAuth from 'helpers/initialCheckAuth';

import * as cmsPageActions from 'actions/cmsPageActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Home({ content }) {
  return (
    <>
      <Head>
        <title>{'Error'}</title>
      </Head>
      <Header />
      <div className="container mt-5">{content}</div>
    </>
  );
}

Home.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);

  let content = '';

  if (req) {
    store.dispatch(cmsPageActions.SET_PAGE_DATA_SERVER(query.data));

    content = query;
  } else {
    store.dispatch(cmsPageActions.RESET_PAGE_DATA());
    store.dispatch(cmsPageActions.GET_PAGE_DATA(query.slug));
  }

  return { isServer, content };
};

export default Home;
