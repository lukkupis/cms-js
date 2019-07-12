import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import * as cmsActions from 'actions/cmsActions';

import Header from 'components/organisms/Header/Header';

function Admin({ data }) {
  const cmsState = useSelector(state => state.cmsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cmsActions.test());
  }, []);

  return (
    <div className="container">
      <Header />
      <h2>Strony:</h2>
      {data.map(item => (
        <div key={item._id}>
          <div>{item.author}</div>
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

Admin.getInitialProps = async ({ req, query }) => {
  let data = query.data;

  if (!req) {
    await axios
      .get('api/pages')
      .then(function(response) {
        data = response.data;
      })
      .catch(function(error) {
        Router.push('/login');
      });
  }
  return { data };
};

export default Admin;
