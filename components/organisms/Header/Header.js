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

import 'theme/index.scss';

function Header(props) {
  const [open, setOpen] = useState(false);
  const cmsStore = useSelector(state => state.cmsStore);
  const { userAdminName } = cmsStore;

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/" passHref>
          <NavbarBrand>cms-js</NavbarBrand>
        </Link>
        <NavbarToggler onClick={() => setOpen(!open)} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
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
