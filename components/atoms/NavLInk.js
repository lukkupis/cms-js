import { withRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

const NavLink = ({ router, children, ...props }) => {
  const child = Children.only(children);

  let className = child.props.className || null;
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${
      props.activeClassName
    }`.trim();
  }

  delete props.activeClassName;

  return (
    <Link
      href={props.href}
      as={props.as}
      passHref={props.passHref}
      replace={props.replace}
      scroll={props.scroll}
    >
      {React.cloneElement(child, { className })}
    </Link>
  );
};

NavLink.defaultProps = {
  activeClassName: 'active'
};

export default withRouter(NavLink);
