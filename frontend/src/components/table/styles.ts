import styled from "styled-components";

const TableContent = styled.table`
  border-collapse: separate;
  border-radius: 10px;
  border-spacing: 0;
  font-size: 1rem;
  margin: 0 auto;

  thead {
    position: sticky;
    top: 0;
  }

  thead > tr {
    scroll-snap-align: end;
  }

  tbody > tr {
    scroll-snap-align: start;
  }

  td,th, button {
    border: 1px solid var(--border-base-color);
    padding: 0.5rem;
  }

  td:first-child,
  th:first-child {
    border-radius: 10px 0 0 10px;
  }

  td:last-child,
  th:last-child,
  button {
    border-radius: 0 10px 10px 0;
  }

  th {
    background-color: var(--primary-color);
  }

  td {
    color: var(--primary-color);
  }

  td.entry-error {
    background-color: var(--alert-color);
    color: var(--main-base-color);
    cursor: pointer;
    opacity: var(--disabled-opacity);
  }

  td.entry-error:hover {
    opacity: 1;
  }
`;

export default TableContent;
