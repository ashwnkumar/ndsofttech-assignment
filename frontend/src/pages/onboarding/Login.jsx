import React, { useState } from "react";
import DynamicForm from "../../components/form/DynamicForm";
import Logo from "/logos/SiteFleet-Logo.png";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";

const socialButtons = [
  { icon: "/icons/google.png", label: "Google" },
  { icon: "/icons/facebook.png", label: "Facebook" },
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {};

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
        },
        {
          formType: "input",
          label: "Password",
          name: "password",
          required: true,
          type: "password",
          value: formData.password,
          onChange: handleInputChange,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center bg-background min-h-screen justify-start gap-20 p-8 text-secondary">
      <div className="w-full flex gap-2 items-center">
        <span>
          <img src={Logo} alt="TaskManager" />
        </span>
      </div>
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
          <Link
            className="text-brand cursor-pointer font-medium self-start"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="w-full h-[2px] bg-gray  relative">
          <div className="w-full absolute left-[45%] -bottom-3">
            <span className={`px-2 bg-background text-lg `}>OR</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4 text-center">
          {socialButtons.map((button, index) => (
            <Button key={index} variant="outline" className="w-full">
              <span className="flex items-center text-secondary gap-4 text-lg">
                <img src={button.icon} alt={button.label} />
                <span>Continue with {button.label}</span>
              </span>
            </Button>
          ))}
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
