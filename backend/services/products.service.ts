import ProductModel from '../models/products.model';
import Product from '../interfaces/product.interface';
import CSVFileEntry from '../interfaces/csvFile.interface';
import Pack from '../interfaces/pack.interface';

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

  async validatePack(packEntries: Pack[], productsNewData: CSVFileEntry[]): Promise<string[]> {
    const errors: string[] = [];

    const packId = packEntries[0].pack_id;
    const packEntryInCSVFile = productsNewData.find(({ code }) => code === Number(packId));

    const productsInPackIds = packEntries
      .map(({ product_id }) => product_id);
    const productsInPack = [];
    for (const code of productsInPackIds) {
      const product = await this.model.getProductByCode(code);
      productsInPack.push(product);
    }

    let totalProductsInPackNewPrice = 0;
    let matchingProductsInCSVFile = [];
    for (const productInDB of productsInPack) {
      const matchingProductInCSVFile = productsNewData.find(({ code }) => code === Number(productInDB?.code));
      const matchingPackEntry = packEntries.find(({ product_id }) => Number(product_id) === Number(productInDB?.code));
      matchingProductsInCSVFile.push(matchingProductInCSVFile);

      const price = matchingProductInCSVFile
        ? Number(matchingProductInCSVFile.new_price)
        : Number(productInDB?.sales_price);
      totalProductsInPackNewPrice += price * Number(matchingPackEntry?.qty);
    }

    if (!matchingProductsInCSVFile.some((value) => value)) {
      errors.push('Não há nenhum produto associado ao pacote no arquivo.');
      return errors;
    }

    if (packEntryInCSVFile?.new_price !== Number(totalProductsInPackNewPrice.toFixed(2))) {
      errors.push('O novo preço do pacote não corresponde ao preço dos produtos unitários.');
    }

    return errors;
  }

  async validateProduct(entry: CSVFileEntry, productsNewData: CSVFileEntry[]): Promise<Product|CSVFileEntry> {
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

    const packOfProduct = await this.model.getPackByProductCode(product.code);
    if (packOfProduct) {
      const packEntryInCSVFile = productsNewData.find(({ code }) => code === Number(packOfProduct.pack_id));
      if (!packEntryInCSVFile) {
        errors.push('Não há nenhum pacote associado ao produto no arquivo.');
        return { ...product, code: Number(product.code), errors }
      }
    }

    const packEntries = await this.model.getPackEntriesByCode(product.code);
    if (packEntries) {
      errors.push(...await this.validatePack(packEntries, productsNewData));
    } else {
      errors.push(...await this.validateProductPrices(product, entry.new_price));
    }

    return { ...product, code: Number(product.code), errors };
  }

  async getProductsValidation(productsNewData: CSVFileEntry[]): Promise<(Product|CSVFileEntry)[]> {
    const products = [];
    for (const entry of productsNewData) {
      const product = await this.validateProduct(entry, productsNewData);
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
