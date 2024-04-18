import styled from "styled-components";

const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  justify-content: center;

  img._splash-screen-logo {
    height: 8rem;
    width: 8rem;
  }

  div._splash-screen-loader {
    width: 16rem;
    margin: 0 auto;
    border-radius: 20px;
    position: relative;
    border: 2px solid var(--primary-color);
    padding: 10px 0px;
  }

  div._splash-screen-loader-bar {
    position: absolute;
    border-radius: 50px;
    top: 0;
    right: 100%;
    bottom: 0;
    left: 0;
    background: #2da77a;
    width: 0;
    animation: borealis-bar 2s linear infinite;
    margin: 2px;
  }

  @keyframes borealis-bar {
    0% {
      left: 0%;
      right: 100%;
      width: 0%
    }

    10% {
      left: 0%;
      right: 75%;
      width: 25%
    }

    90% {
      right: 0%;
      left: 75%;
      width: 25%
    }

    100% {
      left: 100%;
      right: 0%;
      width: 0%
    }
  }
`;

export default LoadingContainer;
