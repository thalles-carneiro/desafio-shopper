import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Main } from '../../components';
import fetchMock from '../mocks/fetch';
import { FetchMock } from '../../types';

describe('Form Component', () => {
  const stringFileValid = `product_code,new_price
  16,22.50
  18,9.2
  22,7.65
  1000,55.2`;

  const uploadInputText = 'Escolha o arquivo';
  const csvFile = new File([stringFileValid], 'atualizacao_preco_exemplo.csv', { type: '.csv' });

  test('renders form with upload input and validate button', () => {
    render(<Main />);

    const uploadInput = screen.getByLabelText(uploadInputText);
    const fileNameParagraph = uploadInput.parentElement?.nextElementSibling;
    const validateButton = screen.getByRole('button', { name: 'Validar' });

    expect(uploadInput).toHaveAttribute('type', 'file');
    expect(fileNameParagraph).toHaveTextContent('');
    expect(validateButton).toBeEnabled();
  });

  test('submits form validate and triggers render of table', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as FetchMock);

    render(<Main />);

    const uploadInput = screen.getByLabelText(uploadInputText);
    const fileNameParagraph = uploadInput.parentElement?.nextElementSibling;
    const validateButton = screen.getByRole('button', { name: 'Validar' });

    await userEvent.upload(uploadInput, csvFile);

    expect(fileNameParagraph).toHaveTextContent('atualizacao_preco_exemplo.csv');

    await userEvent.click(validateButton);

    const loadingElement = screen.queryByAltText('Apple icon');
    expect(loadingElement).not.toBeInTheDocument();

    const tableElement = await screen.findByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('submits form update and triggers reset of page', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as FetchMock);

    render(<Main />);

    const uploadInput = screen.getByLabelText(uploadInputText);
    const fileNameParagraph = uploadInput.parentElement?.nextElementSibling;
    const validateButton = screen.getByRole('button', { name: 'Validar' });

    await userEvent.upload(uploadInput, csvFile);
    await userEvent.click(validateButton);

    const updateButton = screen.getByRole('button', { name: 'Atualizar' });
    expect(updateButton).toBeEnabled();
    await userEvent.click(updateButton);

    const tableElement = screen.queryByRole('table');
    expect(tableElement).not.toBeInTheDocument();
    expect(fileNameParagraph).toHaveTextContent('');
  });
});
