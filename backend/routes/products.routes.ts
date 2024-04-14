import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const router = Router();

const productsController = new ProductsController();

router
  .route('/products')
  .get(productsController.getAll)
  .put(productsController.update);

export default router;
