import React, { useState } from 'react';
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

  return (
    <div className="container mb-5">
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
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
