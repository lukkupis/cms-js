import * as cmsActions from 'actions/cmsActions';
import Router from 'next/router';

export default function initialCheckAuth(req, store, redirect = true) {
  if (req) {
    if (req.session.user) {
      store.dispatch(
        cmsActions.SET_USER({
          name: req.session.user.name,
          id: req.session.user.id
        })
      );
    }
  } else {
    const userAdminName = store.getState().cmsStore.userAdminName;

    if (userAdminName === '' && redirect) {
      Router.push('/login');
    }
  }
}
