import { screen, render } from '@testing-library/react';
import responseToInvalidFile from '../mocks/responseToInvalidFile';
import responseToValidFile from '../mocks/responseToValidFile';
import { Button } from '../../components';

describe('Button Component', () => {
  test('renders validate button', () => {
    render(<Button values={ [] } />);
    const buttonElement = screen.getByRole('button', { name: 'Validar' });
    expect(buttonElement).toBeEnabled();
  });

  test('renders update button after upload invalid file', () => {
    render(<Button update values={ responseToInvalidFile } />);
    const buttonElement = screen.getByRole('button', { name: 'Atualizar' });
    expect(buttonElement).toBeDisabled();
  });

  test('renders update button after upload valid file', () => {
    render(<Button update values={ responseToValidFile } />);
    const buttonElement = screen.getByRole('button', { name: 'Atualizar' });
    expect(buttonElement).toBeEnabled();
  });
});
