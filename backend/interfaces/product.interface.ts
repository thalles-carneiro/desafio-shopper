import { Decimal } from "@prisma/client/runtime/library";

interface Product {
  code: number | bigint;
  name: string;
  cost_price: number | Decimal;
  sales_price: number | Decimal;
  errors?: string[];
}

export default Product;
