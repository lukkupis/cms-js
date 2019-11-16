import React from 'react';

import initialCheckAuth from '../helpers/initialCheckAuth';
import initialReqData from '../helpers/initialReqData';

import Head from 'next/head';
import Header from '../components/organisms/Header/Header';

function PageError({ content }) {
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

PageError.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);
  initialReqData(req, query, store);

  let content = '';

  if (req) {
    content = query.data;
  }

  return { isServer, content };
};

export default PageError;
