import styled from 'styled-components';

const ButtonLink = styled.a`
  padding: 0;
  color: red;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    text-decoration: underline;
    color: red;
  }
`;

export default ButtonLink;
