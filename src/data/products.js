export const initialProducts = [
  {
    id: 1,
    name: "Moletom Insper Premium",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    price: 189.9,
    discount: 20,
    finalPrice: 151.92,
    stock: 45,
    validity: "31/12/2027",
  },
  {
    id: 2,
    name: "Camiseta Insper Básica",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    price: 79.9,
    discount: 10,
    finalPrice: 71.91,
    stock: 120,
    validity: "31/12/2027",
  },
  {
    id: 3,
    name: "Boné Insper",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    price: 59.9,
    discount: 0,
    finalPrice: 59.9,
    stock: 8,
    validity: "30/06/2027",
  },
  {
    id: 4,
    name: "Mochila Insper",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    price: 249.9,
    discount: 15,
    finalPrice: 212.42,
    stock: 30,
    validity: "31/12/2027",
  },
  {
    id: 5,
    name: "Caneca Insper",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    price: 39.9,
    discount: 0,
    finalPrice: 39.9,
    stock: 5,
    validity: "31/12/2026",
  },
  {
    id: 6,
    name: "Garrafa Térmica",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    price: 89.9,
    discount: 20,
    finalPrice: 71.92,
    stock: 25,
    validity: "31/12/2027",
  },
];

export const getProductById = (id) => {
  const numericId = Number(id);
  return initialProducts.find((product) => product.id === numericId);
};