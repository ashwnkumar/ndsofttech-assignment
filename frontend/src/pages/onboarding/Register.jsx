import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DynamicForm from "../../components/form/DynamicForm";
import toast from "react-hot-toast";
import { useGlobal } from "../../contexts/GlobalContext";
import axiosInstance from "../../utils/axiosInstance";
import { apiConfig } from "../../configs/apiConfig";

const socialButtons = [
  { icon: "/icons/google.png", label: "Google" },
  { icon: "/icons/facebook.png", label: "Facebook" },
];

const Register = () => {
  const { setLoading } = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let err = {};

    if (!formData.name) err.name = "Name is Required";
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
      const res = await axiosInstance.post(apiConfig.user.register, formData);
      toast.success(res.data.message || "Registered successfully");
      const { token } = res.data.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log("Error registering:", error);
      toast.error(error.response.data.message || "Something went wrong");
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
          label: "Name",
          name: "name",
          required: true,
          type: "text",
          value: formData.name,
          onChange: handleInputChange,
          error: errors.name,
        },
        {
          formType: "input",
          label: "Email ID",
          name: "email",
          required: true,
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
          placeholder: "Password",
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
        <div className="flex flex-col items-center justify-center gap-1 w-full text-center">
          <h2 className="text-3xl text-heading font-semibold">
            Create Your Account
          </h2>
          <p className="text-lg">
            Please fill the details below to get started.
          </p>
          <DynamicForm options={formOptions} onSubmit={handleSubmit} />
          <p className="font-medium text-secondary">
            Already have an account?{" "}
            <Link to={"/login"} className="text-brand cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
