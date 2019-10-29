import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import * as cmsUserActions from 'actions/cmsUserActions';
import initialCheckAuth from 'helpers/initialCheckAuth';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';
import AdminMenu from 'components/organisms/AdminMenu/AdminMenu';
import AdminMain from 'components/atoms/AdminMain';
import AdminContent from 'components/atoms/AdminContent';
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

function User({ reqAction, isServer, reqRoutePath, reqHost }) {
  const cmsUserStore = useSelector(state => state.cmsUserStore);
  const router = useRouter();
  const dispatch = useDispatch();

  const action = router.query.action || reqAction;

  const host = reqHost || window.location.host;

  useEffect(() => {
    cmsUserStore.userAdminName === '' && router.push('/login');
  }, [cmsUserStore.userAdminName]);

  useEffect(() => {
    if (action === 'new') {
      dispatch(cmsUserActions.SET_PAGE_AUTHOR(cmsUserStore.userAdminId));
    }
  }, [cmsUserStore.userAdminId]);

  const handleOnSubmit = (values, { setSubmitting, setValues, resetForm }) => {
    dispatch(cmsUserActions.RESET_STATUS_FORM());

    if (action === 'new') {
      dispatch(cmsUserActions.ADD_PAGE(values)).then(res => {
        setSubmitting(false);

        router.push(`/admin/page?action=edit&id=${res.newPage._id}`);
      });
    } else if (action === 'edit') {
      dispatch(cmsUserActions.EDIT_PAGE(values)).then(res => {
        setSubmitting(false);
      });
    }
  };

  return (
    <>
      <Head>
        <title>Panel - User</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu isServer={isServer} reqRoutePath={reqRoutePath} />

        <AdminContent className="pt-5">
          {cmsPageStore.pageSaveStatus && (
            <Alert
              color={
                cmsPageStore.pageSaveStatus === 'published' ||
                cmsPageStore.pageSaveStatus === 'edited' ||
                cmsPageStore.pageSaveStatus === 'save'
                  ? 'success'
                  : 'danger'
              }
            >
              {cmsPageStore.pageSaveMessage ||
                'Server error. Please try again later.'}
            </Alert>
          )}

          {cmsPageStore.pageForm.slug && (
            <Link
              href={'/page?slug=' + cmsPageStore.pageForm.slug}
              as={'/' + cmsPageStore.pageForm.slug}
            >
              <a className="d-block mb-4">
                {host + '/' + cmsPageStore.pageForm.slug}
              </a>
            </Link>
          )}

          <Formik
            initialValues={cmsPageStore.pageForm}
            enableReinitialize={true}
            validate={values => {
              let errors = {};
              if (!values.title) {
                errors.title = 'Required';
              }
              return errors;
            }}
            onSubmit={handleOnSubmit}
          >
            {({ errors, touched, isSubmitting, values }) => (
              <FormStrap tag={Form}>
                {action === 'edit' && (
                  <FormGroup>
                    <Label for="slug">Slug</Label>
                    <Input
                      tag={Field}
                      type="text"
                      name="slug"
                      placeholder="Enter the slug"
                    />
                  </FormGroup>
                )}
                <FormGroup>
                  <Label for="title">Title</Label>
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
                  {action === 'edit' ? 'edit' : 'Publish'}
                </Button>
              </FormStrap>
            )}
          </Formik>
        </AdminContent>
      </AdminMain>
    </>
  );
}

User.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);

  let reqAction = '';
  let reqRoutePath = '';
  let reqHost = '';

  if (req) {
    reqAction = req.query.action;
    reqRoutePath = req.originalUrl;
    reqHost = req.headers.host;

    if (reqAction === 'edit') {
      store.dispatch(cmsUserActions.SET_PAGE_SERVER(query.data));
    }
  } else {
    store.dispatch(
      cmsUserActions.RESET_PAGE_FORM(store.getState().cmsUserStore.userAdminId)
    );
    store.dispatch(cmsUserActions.RESET_STATUS_FORM());

    if (query.action === 'edit') {
      store.dispatch(cmsUserActions.GET_PAGE(query.id));
    }
  }
  return { reqAction, isServer, reqRoutePath, reqHost };
};

export default User;
