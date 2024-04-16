import styled from "styled-components";

const TableContent = styled.table`
  border-collapse: separate;
  border-radius: 10px;
  border-spacing: 0;
  font-size: 1rem;
  margin: 0 auto;

  td,th {
    border: 1px solid var(--border-base-color);
    padding: 0.5rem;
  }

  // Set border-radius on the top-left and bottom-left of the first table data on the table row
  td:first-child,
  th:first-child {
    border-radius: 10px 0 0 10px;
  }

  // Set border-radius on the top-right and bottom-right of the last table data on the table row
  td:last-child,
  th:last-child {
    border-radius: 0 10px 10px 0;
  }

  th {
    background-color: var(--primary-color);
  }

  td {
    color: var(--primary-color);
  }

  td.entry-error {
    color: var(--alert-color);
  }
`;

export default TableContent;
