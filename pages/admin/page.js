import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import * as cmsPageActions from 'actions/cmsPageActions';
import initialCheckAuth from 'helpers/initialCheckAuth';
import initialReqData from 'helpers/initialReqData';

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

function Page({ reqAction, isServer, reqRoutePath, reqHost }) {
  const cmsPageStore = useSelector(state => state.cmsPageStore);
  const cmsUserStore = useSelector(state => state.cmsUserStore);
  const router = useRouter();
  const dispatch = useDispatch();

  const action = router.query.action || reqAction;

  const host = reqHost || window.location.host;

  useEffect(() => {
    cmsUserStore.userAdminName === '' && router.push('/login');
  }, [cmsUserStore.userAdminName]);

  useEffect(() => {
    dispatch(cmsPageActions.RESET_STATUS_FORM());
  }, []);

  useEffect(() => {
    if (action === 'new') {
      dispatch(cmsPageActions.SET_PAGE_AUTHOR(cmsUserStore.userAdminId));
    }
  }, [cmsUserStore.userAdminId]);

  const handleOnSubmit = (values, { setSubmitting, setValues, resetForm }) => {
    dispatch(cmsPageActions.RESET_STATUS_FORM());

    if (action === 'new') {
      dispatch(cmsPageActions.ADD_PAGE(values)).then(res => {
        setSubmitting(false);

        if (!res.code) {
          router.push(
            `/admin/page?action=edit&id=${res.newPage._id}`,
            `/admin/pages/page?action=edit&id=${res.newPage._id}`
          );
        } else {
          setErrors({ login: 'Error creating page.' });
        }
      });
    } else if (action === 'edit') {
      dispatch(cmsPageActions.EDIT_PAGE(values)).then(res => {
        setSubmitting(false);
      });
    }
  };

  return (
    <>
      <Head>
        <title>Panel - Page</title>
      </Head>
      <Header />

      <AdminMain>
        <AdminMenu isServer={isServer} reqRoutePath={reqRoutePath} />

        <AdminContent className="pt-5 col-xl-6">
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
                      id="slug"
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
                    id="title"
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
                    id="content"
                    name="content"
                    rows="8"
                  />
                </FormGroup>
                <Button type="submit" disabled={isSubmitting}>
                  {action === 'edit' ? 'Edit' : 'Publish'}
                </Button>
              </FormStrap>
            )}
          </Formik>
        </AdminContent>
      </AdminMain>
    </>
  );
}

Page.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store);
  initialReqData(req, query, store);

  let reqAction = '';
  let reqRoutePath = '';
  let reqHost = '';

  if (req) {
    reqAction = req.query.action;
    reqRoutePath = req.originalUrl;
    reqHost = req.headers.host;

    if (reqAction === 'edit') {
      store.dispatch(cmsPageActions.SET_PAGE_SERVER(query.data));
    }
  } else {
    store.dispatch(
      cmsPageActions.RESET_PAGE_FORM(store.getState().cmsUserStore.userAdminId)
    );

    if (query.action === 'edit') {
      store.dispatch(cmsPageActions.GET_PAGE(query.id));
    }
  }
  return { reqAction, isServer, reqRoutePath, reqHost };
};

export default Page;
