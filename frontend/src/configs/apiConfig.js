export const apiConfig = {
  user: {
    login: "/auth/login",
    register: "/auth/register",
    get: "/user"
  },
  product: {
    add: "/product/add-product",
    get: "/product/get-products",
    delete: (id) => `/product/delete/${id}`,
    edit: (id) => `/product/edit/${id}`,
  },
};
