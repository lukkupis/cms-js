import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import * as cmsActions from 'actions/cmsActions';
import initialCheckAuth from 'helpers/initialCheckAuth';
import * as api from 'helpers/api';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
import AdminHeader from 'components/molecules/AdminHeader';
import {
  Button,
  Form as FormStrap,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';

function Pages() {
  const cmsStore = useSelector(state => state.cmsStore);
  const [saveStatus, setSaveStatus] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

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

          {saveStatus && (
            <Alert color={saveStatus === 'published' ? 'success' : 'primary'}>
              {saveMessage}
            </Alert>
          )}

          <Formik
            initialValues={{
              title: '',
              content: '',
              status: 'published',
              author: cmsStore.userAdminId
            }}
            validate={values => {
              let errors = {};
              if (!values.title) {
                errors.title = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              api.postPageAdmin(values).then(res => {
                setSaveStatus(res.name);
                setSaveMessage(res.message);
                setSubmitting(false);
              });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <FormStrap tag={Form}>
                <FormGroup>
                  <Label for="title">Add a new page</Label>
                  <Input
                    tag={Field}
                    type="text"
                    name="title"
                    placeholder="Enter the title"
                    invalid={errors.title && touched.title}
                  />
                  <FormFeedback>{errors.title}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="content">Content</Label>
                  <Input
                    tag={Field}
                    type="textarea"
                    component="textarea"
                    name="content"
                  />
                </FormGroup>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </FormStrap>
            )}
          </Formik>
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
