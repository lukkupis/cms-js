import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

const StyledContainer = styled.div`
  width: 200px;
  padding-top: 50px;
  background-color: #363b3f;
`;

const StyledLink = styled.a`
  display: block;
  width: 100%;
  padding: 15px;
  text-align: left;
  color: #fff;

  &:hover {
    background-color: red;
    color: #fff;
    text-decoration: none;
  }
`;

const AdminMenu = () => {
  return (
    <StyledContainer className="flex-shrink-0">
      <Link href="/admin/pages" passHref>
        <StyledLink>Pages</StyledLink>
      </Link>
      <Link href="/adimn/users" passHref>
        <StyledLink>Users</StyledLink>
      </Link>
    </StyledContainer>
  );
};

export default AdminMenu;
