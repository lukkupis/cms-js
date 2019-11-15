import * as cmsUserActions from 'actions/cmsUserActions';
import Router from 'next/router';

export default function initialCheckAuth(req, store, redirect = true) {
  if (req) {
    if (req.session.user) {
      store.dispatch(
        cmsUserActions.SET_USER({
          name: req.session.user.name,
          id: req.session.user.id,
          permissions: req.session.user.permissions
        })
      );
    }
    if (req.cookies.demoMode) {
      store.dispatch(cmsUserActions.SET_DEMO_MODE(req.cookies.demoMode));
    }
  } else {
    const userAdminName = store.getState().cmsUserStore.userAdminName;

    if (userAdminName === '' && redirect) {
      Router.push('/login');
    }
  }
}
