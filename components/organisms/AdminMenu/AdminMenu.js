import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import NavLink from 'components/atoms/NavLink';

const StyledContainer = styled.div`
  width: 150px;
  padding-top: 50px;
  background-color: #343a40;
`;

const StyledLink = styled.a`
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  color: #fff;

  &:hover,
  &.active {
    background-color: red;
    color: #fff;
    text-decoration: none;
  }
`;

const AdminMenu = props => {
  const cmsUserStore = useSelector(state => state.cmsUserStore);

  return (
    <StyledContainer className="flex-shrink-0">
      <NavLink
        href="/admin/pages"
        passHref
        isServer={props.isServer}
        reqRoutePath={props.reqRoutePath}
      >
        <StyledLink>
          <i className="fas fa-file fa-fw mr-2" />
          Pages
        </StyledLink>
      </NavLink>
      {cmsUserStore.userPermission === 'admin' && (
        <NavLink
          href="/admin/users"
          passHref
          isServer={props.isServer}
          reqRoutePath={props.reqRoutePath}
        >
          <StyledLink>
            <i className="fas fa-users fa-fw mr-2" />
            Users
          </StyledLink>
        </NavLink>
      )}
    </StyledContainer>
  );
};

export default AdminMenu;
