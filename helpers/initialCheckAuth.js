import * as cmsActions from 'actions/cmsActions';
import Router from 'next/router';

export default function initialCheckAuth(req, store, redirect = true) {
  if (req) {
    store.dispatch(cmsActions.SET_USER_ADMIN(req.session.admin));
  } else {
    const userAdminName = store.getState().cmsStore.userAdminName;

    if (userAdminName === '' && redirect) {
      Router.push('/login');
    }
  }
}
