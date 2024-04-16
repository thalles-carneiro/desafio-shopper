import connection from './connection';
import Product from '../interfaces/product.interface';
import { PrismaClient } from '@prisma/client';
import CSVFileEntry from '../interfaces/csvFile.interface';

class ProductModel {
  connection: PrismaClient;

  constructor() {
    this.connection = connection;
  }

  async getProductByCode(code: number | bigint): Promise<Product | null> {
    const product = await this.connection.products.findFirst({
      where: { code },
    });
    return product;
  }

  async updateProductPrice(productsNewData: CSVFileEntry[]) {
    productsNewData.forEach(({ code, new_price }) => {
      return this.connection.$transaction(async (tx) => {
        await tx.products.update({
          where: {
            code,
          },
          data: {
            sales_price: new_price,
          },
        });
      });
    });
  }
}

export default ProductModel;
