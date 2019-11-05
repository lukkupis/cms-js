import React from 'react';
import { useSelector } from 'react-redux';

import initialCheckAuth from 'helpers/initialCheckAuth';

import * as cmsPageActions from 'actions/cmsPageActions';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
import MenuSortable from 'components/organisms/MenuSortable';

function Menu({ isServer, reqRoutePath }) {
  return (
    <>
      <Head>
        <title>Panel - Menu</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu isServer={isServer} reqRoutePath={reqRoutePath} />

        <AdminContent className="pt-5 col-xl-6">
          <MenuSortable />
        </AdminContent>
      </AdminMain>
    </>
  );
}

Menu.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);

  let reqRoutePath = '';

  if (req) {
    reqRoutePath = req.originalUrl;
  } else {
  }

  return { isServer, reqRoutePath };
};

export default Menu;
