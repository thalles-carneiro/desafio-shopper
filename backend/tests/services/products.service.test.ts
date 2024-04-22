import ProductsService from '../../services/products.service';
import ProductsModel from '../../models/products.model';
import Product from '../../interfaces/product.interface';
import CSVFileEntry from '../../interfaces/csvFile.interface';
import Pack from '../../interfaces/pack.interface';

describe('ProductService', () => {
  let productService: ProductsService;

  beforeEach(() => {
    productService = new ProductsService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('validateEntryFields', () => {
    it('should return error if entry is missing product_code field', async () => {
      const entry: CSVFileEntry = { new_price: 6.50 };
      const errors = await productService.validateEntryFields(entry);
      expect(errors).toEqual(['A entrada está sem o campo "product_code" preenchido.']);
    });

    it('should return error if entry is missing new_price field', async () => {
      const entry: CSVFileEntry = { code: 16 };
      const errors = await productService.validateEntryFields(entry);
      expect(errors).toEqual(['A entrada está sem o campo "new_price" preenchido.']);
    });

    it('should return empty array if entry has both product_code and new_price fields', async () => {
      const entry: CSVFileEntry = { code: 16, new_price: 22.50 };
      const errors = await productService.validateEntryFields(entry);
      expect(errors).toEqual([]);
    });
  });

  describe('validateProductPrices', () => {
    it('should return error if newPrice is not valid', async () => {
      const product: Product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
      };
      const newPrice = -1;
      const errors = await productService.validateProductPrices(product, newPrice);
      expect(errors).toContain('O novo preço deve ser um valor numérico válido e maior que zero.');
    });

    it('should return error if newPrice is below product sales_price', async () => {
      const product: Product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
      };
      const newPrice = 17.59;
      const errors = await productService.validateProductPrices(product, newPrice);
      expect(errors).toContain('O novo preço deve ser maior que o preço de custo do produto.');
    });

    it('should return error if newPrice is higher than 10% of actual sales_price', async () => {
      const product: Product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
      };
      const newPrice = 25.30;
      const errors = await productService.validateProductPrices(product, newPrice);
      expect(errors).toContain('O reajuste de preço não pode exceder 10% em relação ao preço atual.');
    });

    it('should return empty array if newPrice is valid', async () => {
      const product: Product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
      };
      const newPrice = 21.40;
      const errors = await productService.validateProductPrices(product, newPrice);
      expect(errors).toEqual([]);
    });
  });

  describe('getProductByCode', () => {
    it('should return null if product with given code does not exist', async () => {
      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(null);

      const code = 56;
      const result = await productService.getProductByCode(code);

      expect(result).toBeNull();
    });

    it('should return the product with given code', async () => {
      const product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
      };
      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(product);

      const code = 16;
      const result = await productService.getProductByCode(code);
      expect(result).toEqual(product);
    });
  });

  describe('validatePack', () => {
    it('should return empty array if pack is present and new price matches sum of individual product prices', async () => {
      const packEntries: Pack[] = [
        { id: 1, pack_id: 1000, product_id: 18, qty: 6 },
      ];
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 }, { code: 18, new_price: 9.20 }, { code: 1000, new_price: 55.20 },
      ];
      const mockResponseData = {
        code: 18,
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        cost_price: 8.09,
        sales_price: 8.99,
      };
      const expectedErrors: string[] = [];


      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(mockResponseData);

      const errors = await productService.validatePack(packEntries, productsNewData);

      expect(errors).toEqual(expectedErrors);
    });

    it('should return errors if pack is present but new price does not match sum of individual product prices', async () => {
      const packEntries: Pack[] = [
        { id: 1, pack_id: 1000, product_id: 18, qty: 6 },
      ];
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 }, { code: 18, new_price: 9.20 }, { code: 1000, new_price: 60.00 },
      ];
      const mockResponseData = {
        code: 18,
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        cost_price: 8.09,
        sales_price: 8.99,
      };
      const expectedError: string = 'O novo preço do pacote não corresponde ao preço dos produtos unitários.';

      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(mockResponseData);

      const errors = await productService.validatePack(packEntries, productsNewData);

      expect(errors).toContain(expectedError);
    });

    it('should return errors if pack is not present in the CSV file', async () => {
      const packEntries: Pack[] = [
        { id: 1, pack_id: 1000, product_id: 18, qty: 6 },
      ];
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 }, { code: 1000, new_price: 60.00 },
      ];
      const mockResponseData = {
        code: 18,
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        cost_price: 8.09,
        sales_price: 8.99,
      };
      const expectedError: string = 'Não há nenhum produto associado ao pacote no arquivo.';

      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(mockResponseData);

      const errors = await productService.validatePack(packEntries, productsNewData);

      expect(errors).toContain(expectedError);
    });
  });

  describe('validateProduct', () => {
    it('should return entry with error if code is missing', async () => {
      const entry: CSVFileEntry = { new_price: 6.50 };
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 }, { new_price: 6.50 }, { code: 1000, new_price: 55.20 },
      ];
      const expectedErrors: string[] = ['A entrada está sem o campo "product_code" preenchido.'];

      const result = await productService.validateProduct(entry, productsNewData);

      expect(result).toEqual({ ...entry, errors: expectedErrors });
    });

    it('should return entry with error if product is not found', async () => {
      const entry: CSVFileEntry = { code: 56, new_price: 10.50 };
      const productsNewData: CSVFileEntry[] = [
        { code: 56, new_price: 10.50 }, { code: 18, new_price: 9.20 }, { code: 1000, new_price: 55.20 },
      ];
      const mockResponseData = null;
      const expectedErrors: string[] = ['Nenhum produto encontrado com o "code" da entrada.'];

      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(mockResponseData);

      const result = await productService.validateProduct(entry, productsNewData);

      expect(result).toEqual({ ...entry, errors: expectedErrors });
    });

    it('should return error if pack is not present in the CSV file', async () => {
      const entry: CSVFileEntry = { code: 18, new_price: 9.20 };
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.50 }, { code: 18, new_price: 9.20 },
      ];
      const product = {
        code: 18,
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        cost_price: 8.09,
        sales_price: 8.99,
      };
      const pack: Pack = {
        id: 1,
        pack_id: 1000,
        product_id: 18,
        qty: 6,
      };
      const expectedErrors: string[] = ['Não há nenhum pacote associado ao produto no arquivo.'];

      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(product);

      jest.spyOn(ProductsModel.prototype, 'getPackByProductCode')
        .mockResolvedValueOnce(pack);

      const result = await productService.validateProduct(entry, productsNewData);

      expect(result).toEqual({ ...product, code: product.code, errors: expectedErrors });
    });

    it('should return product without errors if product is found and price is valid', async () => {
      const entry: CSVFileEntry = { code: 16, new_price: 22.50 };
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.50 }, { code: 22, new_price: 8.00 },
      ];
      const product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
      };

      jest.spyOn(ProductsModel.prototype, 'getProductByCode')
        .mockResolvedValueOnce(product);

      jest.spyOn(ProductsModel.prototype, 'getPackByProductCode')
        .mockResolvedValueOnce(null);

      jest.spyOn(ProductsModel.prototype, 'getPackEntriesByCode')
        .mockResolvedValueOnce(null);

      const result = await productService.validateProduct(entry, productsNewData);

      expect(result).toEqual({ ...product, code: product.code, errors: [] });
    });
  });

  describe('getProductsValidation', () => {
    it('should return validated products without errors', async () => {
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 }, { code: 18, new_price: 9.20 }, { code: 1000, new_price: 55.20 },
      ];

      const firstProduct: Product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
        errors: [],
      };

      const secondProduct: Product = {
        code: 18,
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        cost_price: 8.09,
        sales_price: 8.99,
        errors: [],
      };

      const thirdProduct: Product = {
        code: 1000,
        name: 'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',
        cost_price: 48.54,
        sales_price: 53.94,
        errors: [],
      };

      jest.spyOn(ProductsService.prototype, 'validateProduct')
        .mockResolvedValueOnce(firstProduct)
        .mockResolvedValueOnce(secondProduct)
        .mockResolvedValueOnce(thirdProduct);

      const result = await productService.getProductsValidation(productsNewData);

      expect(result).toEqual([firstProduct, secondProduct, thirdProduct]);
    });

    it('should return validated products with errors', async () => {
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 25.5 }, { code: 1000, new_price: 55.20 },
      ];

      const firstProduct: Product = {
        code: 16,
        name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
        cost_price: 18.44,
        sales_price: 20.49,
        errors: ['O reajuste de preço não pode exceder 10% em relação ao preço atual.'],
      };

      const secondProduct: Product = {
        code: 1000,
        name: 'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',
        cost_price: 48.54,
        sales_price: 53.94,
        errors: ['Não há nenhum produto associado ao pacote no arquivo.'],
      };

      jest.spyOn(ProductsService.prototype, 'validateProduct')
        .mockResolvedValueOnce(firstProduct)
        .mockResolvedValueOnce(secondProduct)

      const result = await productService.getProductsValidation(productsNewData);

      expect(result).toEqual([firstProduct, secondProduct]);
    });
  });

  describe('updateProductPrice', () => {
    it('should update the prices of products provided in the CSV file', async () => {
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 }, { code: 18, new_price: 9.20 }, { code: 1000, new_price: 55.20 },
      ];

      jest.spyOn(ProductsModel.prototype, 'updateProductPrice')
        .mockResolvedValueOnce(undefined);

      await productService.updateProductPrice(productsNewData);

      expect(ProductsModel.prototype.updateProductPrice).toHaveBeenCalledWith(productsNewData);
    });
  });
});
