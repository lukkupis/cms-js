import * as cmsUserActions from '../actions/cmsUserActions';
import * as pageActions from '../actions/pageActions';

export default function(req, query, store) {
  if (req) {
    //demo mode
    if (req.cookies.demoMode || req.locals.demoMode) {
      store.dispatch(cmsUserActions.SET_DEMO_MODE(true));
    }

    //menu
    store.dispatch(pageActions.SET_MENU_LIST_SERVER(req.locals.menu));
  }
}
