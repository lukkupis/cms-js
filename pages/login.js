import * as cmsUserActions from 'actions/cmsUserActions';

import initialReqData from 'helpers/initialReqData';

import Header from 'components/organisms/Header/Header';
import React from 'react';
import styled from 'styled-components';

import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 56px);
  padding-bottom: 100px;
`;

function Login({ query }) {
  return (
    <>
      <Header />

      <StyledContainer className="container">
        <div className="row w-100">
          <div className="col-md-4 offset-md-4">
            <Form method="post">
              <FormGroup>
                <Label for="login">Login</Label>
                <Input
                  type="text"
                  name="login"
                  id="login"
                  placeholder="login"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </FormGroup>
              {query.valid && (
                <Alert color="danger">Invalid username or password.</Alert>
              )}
              <Button>Submit</Button>
            </Form>
          </div>
        </div>
      </StyledContainer>
    </>
  );
}

Login.getInitialProps = async ({ req, query, store, isServer }) => {
  initialReqData(req, query, store);

  if (req) {
    if (req.session.user) {
      store.dispatch(cmsUserActions.SET_USER(req.session.user.name));
    }
  } else {
    const userAdminName = store.getState().cmsUserStore.userAdminName;

    if (userAdminName != '') {
      Router.push('/admin');
    }
  }

  return { isServer, query };
};

export default Login;
