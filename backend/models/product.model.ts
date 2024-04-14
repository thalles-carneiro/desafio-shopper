import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM products');
    const [rows] = result;
    return rows as Product[];
  }

  async getByCode(code: number): Promise<Product> {
    const result = await this.connection
      .execute('SELECT * FROM products WHERE code=?', [code]);
    const [rows] = result;
    const [book] = rows as Product[];
    return book;
  }

  async update(code: number, product: Product) {
    const { sales_price } = product;
    await this.connection.execute(
      'UPDATE products SET sales_price=? WHERE code=?',
      [sales_price, code],
    );
  }
}

export default ProductModel;
