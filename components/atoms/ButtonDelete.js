import styled from 'styled-components';

const ButtonLink = styled.button`
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
