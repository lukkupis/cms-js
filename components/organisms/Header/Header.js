import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as pageActions from 'actions/pageActions';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Link from 'next/link';

import '@fortawesome/fontawesome-free/js/all';

import 'theme/index.scss';

function Header(props) {
  const [open, setOpen] = useState(false);
  const cmsUserStore = useSelector(state => state.cmsUserStore);
  const cmsMenuStore = useSelector(state => state.cmsMenuStore);
  const pageStore = useSelector(state => state.pageStore);
  const { userAdminName } = cmsUserStore;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageActions.GET_MENU());
  }, [
    cmsMenuStore.SET_MENU_STARTED,
    cmsMenuStore.UPDATE_LINK_NAME_STARTED,
    cmsMenuStore.REMOVE_MENU_STARTED
  ]);

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/" passHref>
          <NavbarBrand>cms-js</NavbarBrand>
        </Link>
        {cmsUserStore.demoMode === true && (
          <span style={{ color: 'red' }}>Demo mode is active.</span>
        )}
        <NavbarToggler onClick={() => setOpen(!open)} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            {pageStore.menu.map(item => (
              <NavItem className="mx-2" key={item._id}>
                <Link href={`/page?slug=${item.slug}`} as={item.path} passHref>
                  <NavLink>{item.linkName}</NavLink>
                </Link>
              </NavItem>
            ))}

            {cmsUserStore.demoMode === true && (
              <NavItem className="mx-2">
                <Link href="/admin" passHref>
                  <NavLink>Admin</NavLink>
                </Link>
              </NavItem>
            )}
            {userAdminName && (
              <>
                <NavItem className="ml-5">
                  <Link href="/logout" passHref>
                    <NavLink>Logout</NavLink>
                  </Link>
                </NavItem>
                <NavItem className="ml-4 d-flex align-items-center">
                  Welcome, {userAdminName}
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;
