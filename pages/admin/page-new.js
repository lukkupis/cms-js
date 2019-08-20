import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

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

function Pages({ query }) {
  const cmsStore = useSelector(state => state.cmsStore);
  const [saveStatus, setSaveStatus] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    cmsStore.userAdminName === '' && router.push('/login');
  }, [cmsStore.userAdminName]);

  const handleOnSubmit = (values, { setSubmitting }) => {
    dispatch(cmsActions.ADD_PAGE(values)).then(res => {
      setSaveStatus(res.name);
      setSaveMessage(res.message);
      setSubmitting(false);

      if (!router.query.action) {
        router.push('/admin/page-new?action=edit');
      }
    });
  };

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
            <Alert
              color={
                saveStatus === 'published' || saveStatus === 'save'
                  ? 'success'
                  : 'danger'
              }
            >
              {saveMessage || 'Server error. Please try again later.'}
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
            onSubmit={handleOnSubmit}
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
                  Publish
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
  return { isServer, query };
};

export default Pages;
