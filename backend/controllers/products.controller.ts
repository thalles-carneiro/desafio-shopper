import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../services/products.service';

class ProductsController {
  productService: ProductService;
  
  constructor(productService = new ProductService()) {
    this.productService = productService;
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  }

  async update(req: Request, res: Response): Promise<void> {
    const product = req.body;
    await this.productService.update(product.code, product);

    res.status(statusCodes.NO_CONTENT).end();
  }
}

export default ProductsController;
