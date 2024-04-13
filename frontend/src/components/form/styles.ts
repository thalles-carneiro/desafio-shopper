import styled from "styled-components";

const FormContainer = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  margin: 0 auto;
  width: 60%;

  div.csvReader {
    border: 1px solid var(--border-base-color);
    color: var(--primary-color);
    display: flex;
    height: 2rem;
    width: 60%
  }
  
  button.browseFile {
    align-self: center;
    background: none;
    border: inherit;
    color: var(--secondary-color);
    font-size: 1.125rem;
    height: 100%;
    width: 40%;
  }

  p.acceptedFile {
    align-self: center;
    width: 60%;
  }
`;

export default FormContainer;
