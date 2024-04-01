export type SessionProps = {
  email: string;
  info?: string;
};

export type PageSearchParams = {
  id: string;
};

export type ProductForOrderProps = {
  id: string;
  productId: number;
  quantity: number;
  price: number;
};
