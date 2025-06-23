import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useGlobal } from "./GlobalContext";
import { apiConfig } from "../configs/apiConfig";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { setLoading } = useGlobal();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.product.get);
      console.log("res from get product", res);
      const { products } = res.data.data;
      setProducts(products);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(apiConfig.product.add, formData);
      console.log("res from add product", res);
      toast.success(res.data.message || "Product added successfully");
      getProducts();
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(apiConfig.product.delete(id));
      getProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        apiConfig.product.update(id),
        formData
      );
      toast.success(res.data.message || "Product updated successfully");
      getProducts();
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getProductDetails = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiConfig.product.getById(id));
      const { product } = res.data.data;
      return product;
    } catch (error) {
      console.log("Error fetching product details:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        getProductDetails,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
