import { screen, render } from '@testing-library/react';
import { Table } from '../../components';
import responseToValidFile from '../mocks/responseToValidFile';
import responseToInvalidFile from '../mocks/responseToInvalidFile';

describe('Table Component', () => {
  test('renders table with correct data', () => {
    render(<Table values={ responseToValidFile } />);

    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);
    expect(tableHeaders[0]).toHaveTextContent('Código');

    const tableCells = screen.getAllByRole('cell');
    expect(tableCells).toHaveLength(20);
    expect(tableCells[0]).toHaveTextContent('16');
    expect(tableCells[1]).toHaveTextContent('AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML');

    const cellsWithCheck = screen.getAllByText('✅');
    expect(cellsWithCheck).toHaveLength(4);
  });

  test('renders table with incorrect data', () => {
    render(<Table values={ responseToInvalidFile } />);

    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);
    expect(tableHeaders[0]).toHaveTextContent('Código');

    const tableCells = screen.getAllByRole('cell');
    expect(tableCells).toHaveLength(25);
    expect(tableCells[5]).toHaveTextContent('18');
    expect(tableCells[6]).toHaveTextContent('BEBIDA ENERGÉTICA VIBE 2L');

    const cellsWithCheck = screen.getAllByText('✅');
    expect(cellsWithCheck).toHaveLength(1);

    const cellsWithError = screen.getAllByText(/Erros/);
    expect(cellsWithError).toHaveLength(4);
  });
});
