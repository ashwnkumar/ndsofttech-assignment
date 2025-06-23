export const apiConfig = {
  user: {
    login: "/auth/login",
    register: "/auth/register",
    google: "/auth/google",
    get: "/user",
  },
  product: {
    add: "/product/add",
    get: "/product/get-all",
    getById: (id) => `/product/${id}`,
    delete: (id) => `/product/delete/${id}`,
    update: (id) => `/product/edit/${id}`,
  },
};
