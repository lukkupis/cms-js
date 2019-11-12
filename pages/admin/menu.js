import React from "react";
import { useSelector } from "react-redux";

import initialCheckAuth from "helpers/initialCheckAuth";

import * as cmsMenuActions from "actions/cmsMenuActions";

import Head from "next/head";
import Header from "components/organisms/Header/Header";
import AdminMenu from "components/organisms/AdminMenu/AdminMenu";
import AdminMain from "components/atoms/AdminMain";
import AdminContent from "components/atoms/AdminContent";
import AdminHeader from "components/molecules/AdminHeader";
import MenuSortable from "components/organisms/MenuSortable/MenuSortable";

function Menu({ isServer, reqRoutePath }) {
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);

  return (
    <>
      <Head>
        <title>Panel - Menu</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu isServer={isServer} reqRoutePath={reqRoutePath} />

        <AdminContent className="col-lg-10">
          <AdminHeader
            name="Menu"
            startedState={cmsMenuStore.GET_MENU_STARTED}
          />

          <div className="mb-5">
            You can drag pages to the menu and change the order of items.
          </div>

          <MenuSortable />
        </AdminContent>
      </AdminMain>
    </>
  );
}

Menu.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);

  let reqRoutePath = "";

  if (req) {
    reqRoutePath = req.originalUrl;

    store.dispatch(cmsMenuActions.SET_MENU_SERVER(query));
  } else {
    store.dispatch(cmsMenuActions.GET_MENU());
  }

  return { isServer, reqRoutePath };
};

export default Menu;
