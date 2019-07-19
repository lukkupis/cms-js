import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import * as cmsActions from 'actions/cmsActions';
import initialCheckAuth from 'helpers/initialCheckAuth';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
import AdminHeader from 'components/molecules/AdminHeader';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Pages() {
  const cmsStore = useSelector(state => state.cmsStore);

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
        <AdminMenu />

        <AdminContent>
          <AdminHeader />

          <Form>
            <FormGroup>
              <Label for="title">Add a new page</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter the title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Content</Label>
              <Input type="textarea" name="text" id="content" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </AdminContent>
      </AdminMain>
    </>
  );
}

Pages.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);

  if (req) {
  } else {
  }
  return { isServer };
};

export default Pages;
