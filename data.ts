export const CATEGORIES = [
  {
    id: 1,
    title: "Category 1",
    slug: "/Category-1",
  },
  {
    id: 2,
    title: "Category 2",
    slug: "/Category-2",
  },
  {
    id: 3,
    title: "Category 3",
    slug: "/Category-3",
  },
];

export const POPULAR_PRODUCTS = [
  { id: 1, productId: 2 },
  { id: 1, productId: 4 },
];

export const PRODUCTS = [
  {
    id: 1,
    title: "Product 1",
    slug: "/Product-1-",
    code: "45675434",
    price: 150.5,
    oldPrice: 170,
    categoryId: 1,
    images: ["/products/0.png"],
    description: "Description Product 1",
    isAvailable: true,
    sizeOptions: [],
    analogues: [],
  },
  {
    id: 2,
    title: "Product 2",
    slug: "/Product-2-",
    code: "59006799000",
    price: 39,
    oldPrice: 45,
    categoryId: 2,
    images: ["/products/0.png"],
    description: "Description Product 2",
    isAvailable: false,
    sizeOptions: [
      { id: 1, productId: 2, size: "1" },
      { id: 2, productId: 3, size: "5" },
      { id: 3, productId: 4, size: "10" },
    ],
    analogues: [{ id: 1, productId: 1 }],
  },
  {
    id: 3,
    title: "Product 3",
    slug: "/Product-3-",
    code: "59333333",
    price: 140,
    oldPrice: 140,
    categoryId: 2,
    images: ["/products/0.png"],
    description: "Description Product 3",
    isAvailable: true,
    sizeOptions: [
      { id: 1, productId: 2, size: "1" },
      { id: 2, productId: 3, size: "5" },
      { id: 3, productId: 4, size: "10" },
    ],
    analogues: [{ id: 1, productId: 1 }],
  },
  {
    id: 4,
    title: "Product 4",
    slug: "/Product-4-",
    code: "5933333435353",
    price: 350,
    oldPrice: 350,
    categoryId: 2,
    images: ["/products/0.png"],
    description: "Description Product 4",
    isAvailable: true,
    sizeOptions: [
      { id: 1, productId: 2, size: "1" },
      { id: 2, productId: 3, size: "5" },
      { id: 3, productId: 4, size: "10" },
    ],
    analogues: [{ id: 1, productId: 1 }],
  },
];
