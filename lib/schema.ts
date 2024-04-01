export type PageSearchParams = {
  id: string;
};

export type ProductForOrderProps = {
  id: string;
  productId: number;
  quantity: number;
  price: number;
};

export type SessionProps = {
  email: string;
  info?: string;
};

export type LocalOrderProps = {
  userEmail: string;
  products: ProductForOrderProps[];
  total: number;
  info?: string;
  iat: Date;
  exp: Date;
};
