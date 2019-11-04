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

  useEffect(() => {
    cmsUserStore.userAdminName === '' && router.push('/login');
  }, [cmsUserStore.userAdminName]);

  useEffect(() => {
    dispatch(cmsUserActions.RESET_STATUS_FORM());
  }, []);

  const handleOnSubmit = (values, { setSubmitting, setErrors }) => {
    dispatch(cmsUserActions.RESET_STATUS_FORM());

    if (action === 'new') {
      dispatch(cmsUserActions.ADD_USER(values)).then(res => {
        setSubmitting(false);

        if (!res.code) {
          router.push(
            `/admin/user?action=edit&id=${res.newUser._id}`,
            `/admin/users/user?action=edit&id=${res.newUser._id}`
          );
        } else if ((res.code = 11000)) {
          setErrors({ login: 'A user with this login already exists.' });
        } else {
          setErrors({ login: 'Error creating member.' });
        }
      });
    } else if (action === 'edit') {
      dispatch(cmsUserActions.EDIT_USER(values)).then(res => {
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

        <AdminContent className="pt-5 col-xl-6">
          {cmsUserStore.userSaveStatus && (
            <Alert
              color={
                cmsUserStore.userSaveStatus === 'added' ||
                cmsUserStore.userSaveStatus === 'edited' ||
                cmsUserStore.userSaveStatus === 'save'
                  ? 'success'
                  : 'danger'
              }
            >
              {cmsUserStore.userSaveMessage ||
                'Server error. Please try again later.'}
            </Alert>
          )}

          <Formik
            initialValues={cmsUserStore.userForm}
            enableReinitialize={true}
            validate={values => {
              let errors = {};

              if (!values.login) {
                errors.login = 'Login is required';
              }
              if (!values.name) {
                errors.name = 'Name is required';
              }
              if (!values.email) {
                errors.email = 'E-mail is required';
              }
              if (!values.password && action === 'new') {
                errors.password = 'Password is required';
              }
              if (values.password.length < 6 && action === 'new') {
                errors.password = 'Passwords must be at least 6 characters';
              }
              if (
                values.password.length &&
                values.password.length < 6 &&
                action === 'edit'
              ) {
                errors.password = 'Passwords must be at least 6 characters';
              }
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords are not the same';
              }
              return errors;
            }}
            onSubmit={handleOnSubmit}
          >
            {({ errors, touched, isSubmitting, values }) => (
              <FormStrap tag={Form}>
                <FormGroup>
                  <Label for="title">Login</Label>
                  <Input
                    tag={Field}
                    type="text"
                    id="title"
                    name="login"
                    placeholder="Enter the login"
                    invalid={errors.login && touched.login}
                  />
                  <FormFeedback>{errors.login}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    tag={Field}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter the password"
                    invalid={errors.password && touched.password}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm password</Label>
                  <Input
                    tag={Field}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    invalid={errors.confirmPassword && touched.confirmPassword}
                  />
                  <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    tag={Field}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter the name"
                    invalid={errors.name && touched.name}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    tag={Field}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter the E-mail"
                    invalid={errors.email && touched.email}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="permissions">Permissions</Label>
                  <Input
                    tag={Field}
                    type="select"
                    as="select"
                    id="permissions"
                    name="permissions"
                    id="permissions"
                  >
                    <option value="admin">Administrator</option>
                    <option value="user">User</option>
                  </Input>
                </FormGroup>
                <Button type="submit" disabled={isSubmitting}>
                  {action === 'edit' ? 'Edit' : 'Add'}
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

    if (reqAction === 'edit' && query) {
      store.dispatch(cmsUserActions.SET_USER_SERVER(query));
    }
  } else {
    store.dispatch(cmsUserActions.RESET_USER_FORM());

    if (query.action === 'edit') {
      store.dispatch(cmsUserActions.GET_USER(query.id));
    }
  }
  return { reqAction, isServer, reqRoutePath, reqHost };
};

export default User;
