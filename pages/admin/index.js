import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/Router';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Index() {
  const cmsStore = useSelector(state => state.cmsStore);

  useEffect(() => {
    if (cmsStore.userAdminName === '') {
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

export default Index;
