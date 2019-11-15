import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import initialCheckAuth from 'helpers/initialCheckAuth';
import initialReqData from 'helpers/initialReqData';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function AdminIndex() {
  const cmsUserStore = useSelector(state => state.cmsUserStore);

  useEffect(() => {
    if (cmsUserStore.userAdminName === '') {
      Router.push('/login');
    } else {
      Router.push('/admin/pages');
    }
  });

  return (
    <>
      <Head>
        <title>Panel</title>
      </Head>
      <Header />
    </>
  );
}

AdminIndex.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);
  initialReqData(req, query, store);

  return { isServer };
};

export default AdminIndex;
