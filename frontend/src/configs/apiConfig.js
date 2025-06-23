export const apiConfig = {
  user: {
    login: "/auth/login",
    register: "/auth/register",
    get: "/user"
  },
  product: {
    add: "/add-product",
    get: "/get-products",
    delete: (id) => `/delete/${id}`,
    edit: (id) => `/edit/${id}`,
  },
};
