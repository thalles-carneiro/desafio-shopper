import connection from '../models/connection';
import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';
import { BadRequestError, NotFoundError } from 'restify-errors';

class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  validateProperties(product: Product): [boolean, string | null] {
    const properties = ['code', 'name', 'cost_price', 'sales_price'];

    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
        return [false, properties[i]];
      }
    }

    return [true, null];
  }

  validateValues(product: Product): [boolean, string | null] {
    const entries = Object.entries(product);

    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];

      if (!value) {
        return [false, property];
      }
    }

    return [true, null];
  }

  validationBook(product: Product): void | string {
    let [valid, property] = this.validateProperties(product);

    if (!valid) {
      return `O campo ${property} é obrigatório.`;
    }

    [valid, property] = this.validateValues(product);

    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`;
    }
  }

  async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  async getById(code: number): Promise<Product> {
    const book = await this.model.getByCode(code);
    return book;
  }

  async update(code: number, product: Product): Promise<void> {
    const isValidBook = this.validationBook(product);
    if (typeof isValidBook === 'string') {
      throw new BadRequestError(isValidBook);
    }

    const productFound = await this.model.getByCode(code);

    if (!productFound) {
      throw new NotFoundError('Produto não encontrado!');
    }

    return this.model.update(code, product);
  }
}

export default ProductService;
