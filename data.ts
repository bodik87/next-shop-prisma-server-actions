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
    title: "Ambrossio 1l",
    slug: "/Ambrossio-1l-",
    code: "45675434",
    price: 150.5,
    oldPrice: 170,
    categoryId: 1,
    description: "Description Ambrossio 1l",
    isAvailable: true,
    sizeOptions: [],
    analogues: [],
  },
  {
    id: 2,
    title: "Raundup 1l",
    slug: "/Raundup-1l-",
    code: "59006799000",
    price: 39,
    oldPrice: 45,
    categoryId: 2,
    description: "Description Raundup 1l",
    isAvailable: false,
    sizeOptions: [
      { id: 1, productId: 2, size: "1l" },
      { id: 2, productId: 3, size: "5l" },
      { id: 3, productId: 4, size: "10l" },
    ],
    analogues: [{ id: 1, productId: 1 }],
  },
  {
    id: 3,
    title: "Raundup 5l",
    slug: "/Raundup-5l-",
    code: "59333333",
    price: 140,
    oldPrice: 140,
    categoryId: 2,
    description: "Description Raundup 5l",
    isAvailable: true,
    sizeOptions: [
      { id: 1, productId: 2, size: "1l" },
      { id: 2, productId: 3, size: "5l" },
      { id: 3, productId: 4, size: "10l" },
    ],
    analogues: [{ id: 1, productId: 1 }],
  },
  {
    id: 4,
    title: "Raundup 10l",
    slug: "/Raundup-10l-",
    code: "5933333435353",
    price: 350,
    oldPrice: 350,
    categoryId: 2,
    description: "Description Raundup 10l",
    isAvailable: true,
    sizeOptions: [
      { id: 1, productId: 2, size: "1l" },
      { id: 2, productId: 3, size: "5l" },
      { id: 3, productId: 4, size: "10l" },
    ],
    analogues: [{ id: 1, productId: 1 }],
  },
];
