import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import * as cmsActions from 'actions/cmsActions';

import Header from 'components/organisms/Header/Header';

function Admin(props) {
  const cmsState = useSelector(state => state.cmsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    cmsActions.test(dispatch);
  }, []);

  return (
    <div className="container">
      <Header />
      panel
    </div>
  );
}

Admin.getInitialProps = async ({ res }) => {
  if (!res) {
    axios
      .get('/pages')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        Router.push('/login');
      });
  }
  return {};
};

export default Admin;
