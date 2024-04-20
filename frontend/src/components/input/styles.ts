import styled from 'styled-components';

const InputContainer = styled.div`
    border: 1px solid var(--border-base-color);
    color: var(--primary-color);
    display: flex;
    width: 80%;

  label.browse-file {
    align-self: center;
    background: none;
    border: inherit;
    color: var(--secondary-color);
    font-size: 1.125rem;
    height: 100%;
    padding: 0.5rem;
    width: 40%;
  }

  input {
    display: none;
  }

  p.accepted-file {
    align-self: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
  }
`;

export default InputContainer;
