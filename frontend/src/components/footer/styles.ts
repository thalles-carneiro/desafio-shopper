import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  height: 10%;
  position: relative;
  width: 100vw;

  img.logo {
    position: absolute;
    left: 2rem;
    height: 100%;
    vertical-align: middle;
    width: 8rem;
  }

  p {
    color: var(--primary-color);
    justify-self: end;
    right: 2rem;
    position: absolute;
  }

  p > a {
    text-decoration: none;
    color: inherit;
  }
`;

export default FooterContainer;
