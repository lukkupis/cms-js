import Header from 'components/organisms/Header/Header';
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Login(props) {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
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
              <Button>Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

Login.getInitialProps = async ({ req, query, store, isServer }) => {
  if (req) {
    store.dispatch(cmsActions.SET_USER_ADMIN(req.session.admin));
  } else {
    const userAdminName = store.getState().cmsStore.userAdminName;

    if (userAdminName != '') {
      Router.push('/admin');
    }
  }

  return { isServer };
};

export default Login;
