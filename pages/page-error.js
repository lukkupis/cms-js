import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import initialCheckAuth from 'helpers/initialCheckAuth';

import * as cmsPageActions from 'actions/cmsPageActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

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

  let content = '';

  if (req) {
    content = query.data;
  }

  return { isServer, content };
};

export default PageError;
