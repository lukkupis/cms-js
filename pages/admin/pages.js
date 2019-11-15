import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import * as cmsPageActions from 'actions/cmsPageActions';
import initialCheckAuth from 'helpers/initialCheckAuth';
import initialReqData from 'helpers/initialReqData';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminList from 'components/organisms/AdminList/AdminList';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
import AdminHeader from 'components/molecules/AdminHeader';
import ModalRemove from 'components/molecules/ModalRemove';

function Pages({ isServer, reqRoutePath }) {
  const dispatch = useDispatch();

  const cmsPageStore = useSelector(state => state.cmsPageStore);
  const cmsUserStore = useSelector(state => state.cmsUserStore);
  const [modalRemove, setModalRemove] = useState({
    open: false,
    itemId: '',
    itemTitle: ''
  });

  useEffect(() => {
    cmsUserStore.userAdminName === '' && Router.push('/login');
  }, [cmsUserStore.userAdminName]);

  return (
    <>
      <Head>
        <title>Panel - Pages</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu isServer={isServer} reqRoutePath={reqRoutePath} />

        <AdminContent>
          <AdminHeader
            name="Pages"
            buttonLabel="Add Page"
            buttonLink="page?action=new"
            buttonLinkAs="pages/page?action=new"
            startedState={
              cmsPageStore.GET_PAGES_STARTED || cmsPageStore.DELETE_PAGE_STARTED
            }
          />

          {cmsPageStore.pages.length > 0 && (
            <AdminList
              list={cmsPageStore.pages}
              columns={[
                { label: 'title', content: 'title' },
                {
                  label: 'author',
                  content: ['author', 'name'],
                  type: 'object'
                },
                { label: 'created', content: 'created', type: 'date' },
                { label: 'status', content: 'status' }
              ]}
              buttons={(itemId, itemTitle) => [
                {
                  label: 'Edit',
                  link: `/admin/page?action=edit&id=${itemId}`,
                  as: `/admin/pages/page?action=edit&id=${itemId}`
                },
                {
                  label: 'Delete',
                  action: () => {
                    setModalRemove({ open: true, itemId, itemTitle });
                  }
                }
              ]}
            />
          )}
        </AdminContent>
      </AdminMain>
      <ModalRemove
        isOpen={modalRemove.open}
        toggle={() =>
          setModalRemove({ ...modalRemove, open: !modalRemove.open })
        }
        itemTitle={modalRemove.itemTitle}
        action={() => {
          setModalRemove({ ...modalRemove, open: !modalRemove.open });
          dispatch(cmsPageActions.DELETE_PAGE(modalRemove.itemId));
        }}
      />
    </>
  );
}

Pages.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);
  initialReqData(req, query, store);

  let reqRoutePath = '';

  if (req) {
    reqRoutePath = req.originalUrl;

    store.dispatch(cmsPageActions.SET_PAGES_SERVER(query.data));
  } else {
    store.dispatch(cmsPageActions.GET_PAGES());
  }
  return { isServer, reqRoutePath };
};

export default Pages;
