import { CirclePlus, LayoutDashboard, Plus, ShoppingCart } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarRoutes = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center p-2 px-3">
      <ul className="w-full flex flex-col items-start justify-center gap-2 ">
        {sidebarRoutes.map(({ path, label, icon: Icon }, idx) => (
          <NavLink
            to={path}
            key={idx}
            className={({ isActive }) =>
              `flex flex-row items-center w-full justify-start cursor-pointer rounded-lg p-2 font-medium gap-2 ${
                isActive
                  ? "bg-brand-faded text-brand font-medium"
                  : "hover:bg-hover text-secondary"
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
