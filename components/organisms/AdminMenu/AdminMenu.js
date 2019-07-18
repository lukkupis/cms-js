import React from 'react';
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

const AdminMenu = () => {
  return (
    <StyledContainer className="flex-shrink-0">
      <NavLink href="/admin/pages" passHref>
        <StyledLink>
          <i className="fas fa-file fa-fw mr-2" />
          Pages
        </StyledLink>
      </NavLink>
      <NavLink href="/admin/users" passHref>
        <StyledLink>
          <i className="fas fa-users fa-fw mr-2" />
          Users
        </StyledLink>
      </NavLink>
    </StyledContainer>
  );
};

export default AdminMenu;
