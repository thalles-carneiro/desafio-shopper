import ProductModel from '../../models/products.model';
import { prismaMock } from '../mocks/prisma';
import CSVFileEntry from '../../interfaces/csvFile.interface';
import { Decimal } from '@prisma/client/runtime/library';

describe('ProductModel', () => {
  let productModel: ProductModel;

  beforeEach(() => {
    productModel = new ProductModel();
  });

  describe('getPackEntriesByCode', () => {
    it('should return pack entries if found', async () => {
      const packEntries = [
        { id: BigInt(1), pack_id: BigInt(1000), product_id: BigInt(18), qty: BigInt(6) },
      ];
      prismaMock.packs.findMany.mockResolvedValueOnce(packEntries);

      const result = await productModel.getPackEntriesByCode(1000);

      expect(result).toEqual(packEntries);
    });

    it('should return null if no pack entries found', async () => {
      prismaMock.packs.findMany.mockResolvedValueOnce([]);

      const result = await productModel.getPackEntriesByCode(2000);

      expect(result).toBeNull();
    });
  });

  describe('getPackByProductCode', () => {
    it('should return pack if found', async () => {
      const pack = { id: BigInt(1), pack_id: BigInt(1000), product_id: BigInt(18), qty: BigInt(6) };
      prismaMock.packs.findFirst.mockResolvedValueOnce(pack);

      const result = await productModel.getPackByProductCode(18);

      expect(result).toEqual(pack);
    });

    it('should return null if no pack found', async () => {
      prismaMock.packs.findFirst.mockResolvedValueOnce(null);

      const result = await productModel.getPackByProductCode(56);

      expect(result).toBeNull();
    });
  });

  describe('getProductByCode', () => {
    it('should return product if found', async () => {
      const product = {
        code: BigInt(18),
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        cost_price: new Decimal(8.09),
        sales_price: new Decimal(8.99),
      };
      prismaMock.products.findFirst.mockResolvedValueOnce(product);

      const result = await productModel.getProductByCode(18);

      expect(result).toEqual(product);
    });

    it('should return null if no product found', async () => {
      prismaMock.products.findFirst.mockResolvedValueOnce(null);

      const result = await productModel.getProductByCode(56);

      expect(result).toBeNull();
    });
  });

  describe('updateProductPrice', () => {
    it('should update product price', async () => {
      const productsNewData: CSVFileEntry[] = [
        { code: 16, new_price: 22.5 },
      ];
      prismaMock.$transaction.mockImplementationOnce(async () => {
        return prismaMock.products.update.mockResolvedValueOnce({
          code: BigInt(16),
          name: 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',
          cost_price: new Decimal(18.44),
          sales_price: new Decimal(22.5),
        });
      });

      await productModel.updateProductPrice(productsNewData);

      expect(prismaMock.products.update).toHaveBeenCalledWith({
        where: { code: 16 },
        data: { sales_price: 22.5 },
      });
    });
  });
});
