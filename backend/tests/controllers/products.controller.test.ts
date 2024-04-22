import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import ProductsRoutes from '../../routes/products.routes';
import ProductService from '../../services/products.service';

describe('ProductsController', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(ProductsRoutes);

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST /products', () => {
    it('should return 200 and products with validation errors', async () => {
      const mockRequestData = [
        { code: 16, new_price: 21.70 },
        { code: 18, new_price: 9.20 },
      ];

      const mockResponseData = [
        {
          code: 16,
          name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
          cost_price: 18.44,
          sales_price: 22.5,
          errors: [],
        },
        {
          code: 18,
          name: 'BEBIDA ENERGÉTICA VIBE 2L',
          cost_price: 8.09,
          sales_price: 9.2,
          errors: ['Não há nenhum pacote associado ao produto no arquivo.'],
        },
      ];

      jest.spyOn(ProductService.prototype, 'getProductsValidation')
        .mockResolvedValueOnce(mockResponseData);

      const response = await request(app)
        .post('/products')
        .send(mockRequestData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockResponseData);
    });
  });

  describe('PUT /products', () => {
    it('should return 204 on successful update', async () => {
      const mockRequestData = [
        { code: 22, new_price: 7.65 },
      ];

      jest.spyOn(ProductService.prototype, 'updateProductPrice')
        .mockResolvedValueOnce(undefined);

      await request(app)
        .put('/products')
        .send(mockRequestData)
        .expect(204);
    });
  });
});
