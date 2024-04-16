import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';
import CSVFileEntry from '../interfaces/csvFile.interface';

class ProductService {
  model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  async validateEntryFields(entry: CSVFileEntry): Promise<string[]> {
    const errors: string[] = [];

    if (!entry.code) {
      errors.push('A entrada está sem o campo "product_code" preenchido.');
    }

    if (!entry.new_price) {
      errors.push('A entrada está sem o campo "new_price" preenchido.');
    }

    return errors;
  }

  async validateProductPrices(product: Product, newPrice: number): Promise<string[]> {
    const errors: string[] = [];

    if (isNaN(newPrice) || newPrice <= 0) {
      errors.push('O novo preço deve ser um valor numérico válido e maior que zero.');
    }

    if (newPrice <= Number(product.cost_price)) {
      errors.push('O novo preço deve ser maior que o preço de custo do produto.');
    }

    const maxPriceIncrease = Number(product.sales_price) * 0.1;
    const priceDifference = Math.abs(newPrice - Number(product.sales_price));
    if (priceDifference > maxPriceIncrease) {
      errors.push('O reajuste de preço não pode exceder 10% em relação ao preço atual.');
    }

    return errors;
  }

  async validateProduct(entry: CSVFileEntry): Promise<Product|CSVFileEntry> {
    const errors: string[] = [];

    errors.push(...await this.validateEntryFields(entry));

    if (!entry.code) {
      return { ...entry, errors };
    }

    const product = await this.model.getProductByCode(entry.code);

    if (!product) {
      errors.push('Nenhum produto encontrado com o "code" da entrada.');
      return { ...entry, errors };
    }

    errors.push(...await this.validateProductPrices(product, entry.new_price));

    return { ...product, code: Number(product.code), errors };
  }

  async getProductsValidation(productsNewData: CSVFileEntry[]): Promise<(Product|CSVFileEntry)[]> {
    const products = [];
    for (const entry of productsNewData) {
      const product = await this.validateProduct(entry);
      products.push(product);
    };
    return products;
  }

  async getProductByCode(code: number): Promise<Product | null> {
    const product = await this.model.getProductByCode(code);
    return product && null;
  }

  async updateProductPrice(productsNewData: CSVFileEntry[]): Promise<void> {
    return this.model.updateProductPrice(productsNewData);
  }
}

export default ProductService;
