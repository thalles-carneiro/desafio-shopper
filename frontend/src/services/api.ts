import { Product } from '../types';

export const getProductsValidation = async (entries: Product[]) => {
  const response = await fetch('http://localhost:8000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries),
  });
  const products = await response.json();
  return products;
};

export const updateProductPrice = async (entries: Product[]) => {
  await fetch('http://localhost:8000/products', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries),
  });
};
