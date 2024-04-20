import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import ProductsRoutes from './routes/products.routes';
import statusCodes from './statusCodes';
import 'express-async-errors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8000;

app.use(ProductsRoutes);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'BadRequestError':
      res.status(statusCodes.BAD_REQUEST).json({ message });
      break;
    case 'NotFoundError':
      res.status(statusCodes.NOT_FOUND).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
