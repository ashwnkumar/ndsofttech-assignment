import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../configs/apiConfig";
import toast from "react-hot-toast";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
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

    if (token) {
      getUserDetails();
    }
  }, [token]);

  return (
    <GlobalContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
