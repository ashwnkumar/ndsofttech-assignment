export const apiConfig = {
  user: {
    login: "/user/login",
    register: "/user/register",
  },
  product: {
    add: "/add-product",
    get: "/get-products",
    delete: (id) => `/delete/${id}`,
    edit: (id) => `/edit/${id}`,
  },
};
