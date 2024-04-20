export interface Product {
  code: number;
  name?: string;
  cost_price?: number;
  sales_price?: number;
  new_price?: number;
  errors?: string[];
}

export type FetchMock = (
  _: RequestInfo | URL,
  init: RequestInit | undefined
) => Promise<Response>;
