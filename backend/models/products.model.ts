import connection from './connection';
import Product from '../interfaces/product.interface';
import { PrismaClient } from '@prisma/client';
import CSVFileEntry from '../interfaces/csvFile.interface';
import Pack from '../interfaces/pack.interface';

class ProductModel {
  connection: PrismaClient;

  constructor() {
    this.connection = connection;
  }

  async getPackEntriesByCode(code: number | bigint): Promise<Pack[] | null> {
    const packEntries = await this.connection.packs.findMany({
      where: { pack_id: code },
    });
    return packEntries.length ? packEntries : null;
  }

  async getPackByProductCode(code: number | bigint): Promise<Pack | null> {
    const pack = await this.connection.packs.findFirst({
      where: { product_id: code },
    });
    return pack;
  }

  async getProductByCode(code: number | bigint): Promise<Product | null> {
    const product = await this.connection.products.findFirst({
      where: { code },
    });
    return product;
  }

  async updateProductPrice(productsNewData: CSVFileEntry[]) {
    for (const { code, new_price } of productsNewData) {
      await this.connection.products.update({
        where: {
          code,
        },
        data: {
          sales_price: new_price,
        },
      });
    }
  }
}

export default ProductModel;
