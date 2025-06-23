import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DynamicForm from "../components/form/DynamicForm";
import Button from "../components/form/Button";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { apiConfig } from "../configs/apiConfig";
import { useGlobal } from "../contexts/GlobalContext";

const socialButtons = [
  { icon: "/icons/google.png", label: "Google" },
  { icon: "/icons/facebook.png", label: "Facebook" },
];

const Login = () => {
  const { setUser, setLoading } = useGlobal();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let err = {};

    if (!formData.email) err.email = "Email is Required";
    if (!formData.password) err.password = "Password is Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm())
      return toast.error("Please fill all the required fields");

    try {
      setLoading(true);
      const res = await axiosInstance.post(apiConfig.user.login, formData);
      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      toast.success(res.data.message || "Logged in successfully");
      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const formOptions = [
    {
      fields: [
        {
          formType: "input",
          label: "Email ID",
          required: true,
          name: "email",
          type: "email",
          value: formData.email,
          onChange: handleInputChange,
          error: errors.email,
        },
        {
          formType: "input",
          label: "Password",
          name: "password",
          required: true,
          type: "password",
          value: formData.password,
          onChange: handleInputChange,
          error: errors.password,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center bg-background min-h-screen justify-center gap-20 p-8 text-secondary">
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-lg">
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <h2 className="text-3xl text-heading font-semibold">Login</h2>
          <p className="font-medium text-secondary">
            Enter Your Details to Login
          </p>
          <DynamicForm
            options={formOptions}
            onSubmit={handleSubmit}
            submitText="Login"
          />
        </div>
        <div className="w-full h-[2px] bg-gray  relative">
          <div className="w-full absolute left-[45%] -bottom-3">
            <span className={`px-2 bg-background text-lg `}>OR</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4 text-center">
          <Button variant="outline" className="w-full">
            <span className="flex items-center text-secondary gap-4 text-lg">
              <img src={"/icons/google.png"} alt="Google" />
              <span>Continue with Google</span>
            </span>
          </Button>

          <p className="font-medium text-secondary mt-2">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-brand cursor-pointer">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
