import { screen, render } from '@testing-library/react';
import { Header } from '../../components';

describe('Header Component', () => {
  test('renders logo', () => {
    render(<Header />);
    const logoElement = screen.getByAltText('Logo da Shopper');
    expect(logoElement).toHaveAttribute('src', '/src/assets/logo-shopper.svg');
  });
});
