import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import * as cmsActions from 'actions/cmsActions';
import initialCheckAuth from 'helpers/initialCheckAuth';

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

  const cmsStore = useSelector(state => state.cmsStore);
  const [modalRemove, setModalRemove] = useState({
    open: false,
    itemId: '',
    itemTitle: ''
  });

  useEffect(() => {
    cmsStore.userAdminName === '' && Router.push('/login');
  }, [cmsStore.userAdminName]);

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
              cmsStore.GET_PAGES_STARTED || cmsStore.DELETE_PAGE_STARTED
            }
          />

          {cmsStore.pages.length > 0 && (
            <AdminList
              list={cmsStore.pages}
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
          dispatch(cmsActions.DELETE_PAGE(modalRemove.itemId));
        }}
      />
    </>
  );
}

Pages.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);

  let reqRoutePath = '';

  if (req) {
    reqRoutePath = req.originalUrl;

    store.dispatch(cmsActions.SET_PAGES_SERVER(query.data));
  } else {
    store.dispatch(cmsActions.GET_PAGES());
  }
  return { isServer, reqRoutePath };
};

export default Pages;
