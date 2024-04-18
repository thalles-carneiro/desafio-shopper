import styled from "styled-components";

const MainContainer = styled.main`
  height: 80%;
  width: 100vw;

  section {
    height: 60%;
    margin: 0 auto;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    width: 80%;
  }

  section > table {
    padding: 1rem;
    width: 100%;
  }

  ::-webkit-scrollbar {
    height: 0.6rem;
    width: 0.6rem;
  }

  ::-webkit-scrollbar-track {
    background: var(--border-base-color);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 8px;
  }
`;

export default MainContainer;
