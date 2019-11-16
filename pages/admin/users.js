import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import * as cmsUserActions from '../../actions/cmsUserActions';
import initialCheckAuth from '../../helpers/initialCheckAuth';
import initialReqData from '../../helpers/initialReqData';

import Head from 'next/head';

import Header from '../../components/organisms/Header/Header';
import AdminList from '../../components/organisms/AdminList/AdminList';
import AdminMenu from '../../components/organisms/AdminMenu/AdminMenu';
import AdminMain from '../../components/atoms/AdminMain';
import AdminContent from '../../components/atoms/AdminContent';
import AdminHeader from '../../components/molecules/AdminHeader';
import ModalInfo from '../../components/molecules/ModalInfo';
import ModalRemove from '../../components/molecules/ModalRemove';

function Users({ isServer, reqRoutePath }) {
  const dispatch = useDispatch();

  const cmsUserStore = useSelector(state => state.cmsUserStore);
  const [modalRemove, setModalRemove] = useState({
    open: false,
    itemId: '',
    itemName: ''
  });

  useEffect(() => {
    cmsUserStore.userAdminName === '' && Router.push('/login');
  }, [cmsUserStore.userAdminName]);

  return (
    <>
      <Head>
        <title>Panel - Users</title>
      </Head>
      <Header />
      <AdminMain>
        <AdminMenu isServer={isServer} reqRoutePath={reqRoutePath} />

        <AdminContent>
          <AdminHeader
            name="Users"
            buttonLabel="Add User"
            buttonLink="user?action=new"
            buttonLinkAs="users/user?action=new"
            startedState={
              cmsUserStore.GET_USERS_STARTED || cmsUserStore.DELETE_USER_STARTED
            }
          />

          {cmsUserStore.users.length > 0 ? (
            <AdminList
              list={cmsUserStore.users}
              columns={[
                { label: 'name', content: 'name' },
                { label: 'login', content: 'login' },
                { label: 'email', content: 'email' },
                { label: 'registered', content: 'registered', type: 'date' },
                { label: 'permissions', content: 'permissions' }
              ]}
              buttons={(itemId, itemName) => [
                {
                  label: 'Edit',
                  link: `/admin/user?action=edit&id=${itemId}`,
                  as: `/admin/users/user?action=edit&id=${itemId}`
                },
                {
                  label: 'Delete',
                  action: () => {
                    setModalRemove({ open: true, itemId, itemName });
                  }
                }
              ]}
            />
          ) : (
            'Create a new administrator.'
          )}
        </AdminContent>
      </AdminMain>
      <ModalRemove
        isOpen={modalRemove.open}
        toggle={() =>
          setModalRemove({ ...modalRemove, open: !modalRemove.open })
        }
        itemTitle={modalRemove.itemName}
        action={() => {
          setModalRemove({ ...modalRemove, open: !modalRemove.open });
          dispatch(cmsUserActions.DELETE_USER(modalRemove.itemId));
        }}
      />
      <ModalInfo
        toggle={() => dispatch(cmsUserActions.CLEAR_MODAL_MESSAGE())}
        message={cmsUserStore.modalMessage}
      />
    </>
  );
}

Users.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);
  initialReqData(req, query, store);

  let reqRoutePath = '';

  if (req) {
    reqRoutePath = req.originalUrl;

    store.dispatch(cmsUserActions.SET_USERS_SERVER(query.data));
  } else {
    store.dispatch(cmsUserActions.GET_USERS());
  }
  return { isServer, reqRoutePath };
};

export default Users;
