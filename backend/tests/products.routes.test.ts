import request from 'supertest';
import app from '../index';
import ProductService from '../services/products.service';

jest.mock('../services/products.service');

describe('Products Routes', () => {
  let mockService: jest.Mocked<ProductService>;

  beforeEach(() => {
    mockService = new ProductService() as jest.Mocked<ProductService>;
  });

  test('POST /products should return 200 and call getProductsValidation', async () => {
    mockService.getProductsValidation.mockResolvedValueOnce([]);

    const response = await request(app)
      .post('/products')
      .send([{ code: 123, new_price: 10 }]);
    
    expect(response.status).toBe(200);
    expect(mockService.getProductsValidation).toHaveBeenCalledWith([{ code: 123, new_price: 10 }]);
  });

  test('PUT /products should return 204 and call updateProductPrice', async () => {
    mockService.updateProductPrice.mockResolvedValueOnce();

    const response = await request(app)
      .put('/products')
      .send([{ code: 123, new_price: 10 }]);
    
    expect(response.status).toBe(204);
    expect(mockService.updateProductPrice).toHaveBeenCalledWith([{ code: 123, new_price: 10 }]);
  });
});
