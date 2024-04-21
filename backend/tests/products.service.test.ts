import ProductService from '../services/products.service';
import ProductModel from '../models/products.model';

jest.mock('../models/product.model');

describe('Products Service', () => {
  let productService: ProductService;
  let mockModel: jest.Mocked<ProductModel>;

  beforeEach(() => {
    mockModel = new ProductModel() as jest.Mocked<ProductModel>;
    productService = new ProductService(mockModel);
  });

  test('getProductsValidation should return products with validation', async () => {
    mockModel.getProductByCode.mockResolvedValueOnce({ code: 123, sales_price: 5, cost_price: 4 });
    
    const result = await productService.getProductsValidation([{ code: 123, new_price: 10 }]);
    
    expect(result).toEqual([{ code: 123, sales_price: 5, cost_price: 4, errors: [] }]);
  });

  test('updateProductPrice should call model with correct data', async () => {
    await productService.updateProductPrice([{ code: 123, new_price: 10 }]);
    
    expect(mockModel.updateProductPrice).toHaveBeenCalledWith([{ code: 123, new_price: 10 }]);
  });
});
