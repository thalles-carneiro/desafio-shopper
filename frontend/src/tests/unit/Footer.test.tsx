import { screen, render } from '@testing-library/react';
import { Footer } from '../../components';

describe('Footer Component', () => {
  test('renders logo', () => {
    render(<Footer />);
    const logoElement = screen.getByAltText('Logo da Shopper');
    expect(logoElement).toHaveAttribute('src', '/src/assets/logo-shopper.svg');
  });

  test('renders attribution text and link to LinkedIn', () => {
    render(<Footer />);
    const attributionElement = screen.getByText('Desafio técnico feito por', { selector: 'span' });
    const linkElement = screen.getByRole('link', { name: 'Thalles Carneiro' });
    expect(attributionElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://www.linkedin.com/in/thallescarneiro/');
  });
});
