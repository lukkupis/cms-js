import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { userAdminName } = cmsUserStore;

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/" passHref>
          <NavbarBrand>cms-js</NavbarBrand>
        </Link>
        <NavbarToggler onClick={() => setOpen(!open)} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mx-2">
              <Link
                href="/page?slug=strona-testowa"
                as="/strona-testowa"
                passHref
              >
                <NavLink>Strona testowa</NavLink>
              </Link>
            </NavItem>
            <NavItem className="mx-2">
              <Link href="/admin" passHref>
                <NavLink>Admin</NavLink>
              </Link>
            </NavItem>
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
