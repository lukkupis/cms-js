import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as api from 'helpers/api';

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
    data = await api.getPages(Router);
  }
  return { data };
};

export default Admin;
