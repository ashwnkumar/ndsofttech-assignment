import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../configs/apiConfig";
import toast from "react-hot-toast";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  console.log("products from context", products);

  useEffect(() => {
    const getUserDetails = async () => {
      
      try {
        const res = await axiosInstance.get(apiConfig.user.get);
        const { user } = res.data.data;
        setUser(user);
      } catch (error) {
        console.log("Error fetching user details:", error);
        toast.error(error.message || "Something went wrong");
      }
    };

    getUserDetails();
  }, []);

  const addProduct = async ( ) => {
    try {
      const res = await axiosInstance.post(apiConfig.product.add, formData);
      console.log("res from add product", res);
      toast.success(res.data.message || "Product added successfully");
      handleClose();
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <GlobalContext.Provider
      value={{ products, user, setUser, loading, setLoading, setProducts,  }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
