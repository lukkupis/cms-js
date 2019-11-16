import * as cmsUserActions from '../actions/cmsUserActions';
import * as pageActions from '../actions/pageActions';

export default function(req, query, store) {
  if (req) {
    //demo mode
    if (req.cookies.demoMode) {
      store.dispatch(cmsUserActions.SET_DEMO_MODE(req.cookies.demoMode));
    }

    //menu
    store.dispatch(pageActions.SET_MENU_LIST_SERVER(req.locals.menu));
  }
}
