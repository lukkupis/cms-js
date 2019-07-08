import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import * as cmsActions from 'actions/cmsActions';

function Admin(props) {
  const cmsState = useSelector(state => state.cmsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    cmsActions.test(dispatch);
  }, []);

  return <div>Panel - {cmsState.test}</div>;
}

Admin.getInitialProps = async ({ res }) => {
  if (!res) {
    Router.push('/login');
  }
  return {};
};

export default Admin;
