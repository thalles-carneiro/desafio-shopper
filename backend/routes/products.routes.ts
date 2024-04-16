import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const router = Router();

const productsController = new ProductsController();

router
  .route('/products')
  .post(productsController.getProductsValidation)
  .put(productsController.updateProductPrice);

export default router;
