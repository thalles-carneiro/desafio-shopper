import styled from 'styled-components';

const ActionButton = styled.button<{ $secondary?: boolean; }>`
  background-color: var(
    ${({ $secondary }) => {
    if ($secondary) return '--secondary-color';
    return '--primary-color';
  }}
  );
  border: 1px solid var(--border-base-color);
  border-radius: 10px;
  color: inherit;
  cursor: pointer;
  font-size: 1.5rem;
  text-transform: uppercase;
  height: 2.5rem;
  width: 18.75rem;

  &:hover {
    filter: brightness(var(--hover-brightness));
  }

  &:disabled {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }
`;

export default ActionButton;
