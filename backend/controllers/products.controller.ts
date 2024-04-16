import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../services/products.service';
import CSVFileEntry from '../interfaces/csvFile.interface';

class ProductsController {
  productService: ProductService;

  constructor(productService = new ProductService()) {
    this.productService = productService;
    this.getProductsValidation = this.getProductsValidation.bind(this);
    this.updateProductPrice = this.updateProductPrice.bind(this);
  }

  async getProductsValidation(req: Request, res: Response): Promise<void> {
    const productsNewData: CSVFileEntry[] = req.body;
    const products = await this.productService.getProductsValidation(productsNewData);

    res.status(statusCodes.OK).json(products);
  }

  async updateProductPrice(req: Request, res: Response): Promise<void> {
    const productsNewData = req.body;
    await this.productService.updateProductPrice(productsNewData);

    res.status(statusCodes.NO_CONTENT).end();
  }
}

export default ProductsController;
