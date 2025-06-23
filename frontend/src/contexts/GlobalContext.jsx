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

  return (
    <GlobalContext.Provider
      value={{ products, user, setUser, loading, setLoading, setProducts }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
