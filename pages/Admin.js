import React, { useEffect } from 'react';
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

export default Admin;
