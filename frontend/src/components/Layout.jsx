import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ModalComponent from "./ModalComponent";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const modalButtons = [
    {
      label: "Cancel",
      variant: "outline",
      onClick: () => {
        setAuthModal(false);
        navigate("/");
      },
    },
    {
      label: "Login",
      onClick: () => {
        setAuthModal(false);
        navigate("/login");
      },
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-primary">
      <header className="w-full sticky top-0 z-50 bg-white">
        <Navbar />
      </header>

      <div className="flex flex-1 w-full mx-auto gap-4">
        <div className="hidden md:block w-1/6 relative">
          <aside className="sticky top-[3.5rem] h-[calc(100vh-4rem)] overflow-auto border-r border-gray/50">
            <Sidebar />
          </aside>
        </div>

        <main className="flex-1 flex items-start justify-center overflow-auto p-4">
          <div className="w-full ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
