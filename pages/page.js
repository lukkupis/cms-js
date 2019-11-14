import React from 'react';
import { useSelector } from 'react-redux';

import initialCheckAuth from 'helpers/initialCheckAuth';

import * as pageActions from 'actions/pageActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Page(props) {
  const pageStore = useSelector(state => state.pageStore);
  const page = pageStore.pageData;

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

Page.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);

  if (req) {
    store.dispatch(pageActions.SET_PAGE_DATA_SERVER(query.data));
  } else {
    store.dispatch(pageActions.RESET_PAGE_DATA());
    store.dispatch(pageActions.GET_PAGE_DATA(query.slug));
  }

  return { isServer };
};

export default Page;
