import { Moon, UserCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./form/Button";
import { createPortal } from "react-dom";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // If click is outside the menu container, close the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);

  return (
    <div className=" w-full  flex flex-row items-center justify-between border-b border-gray p-2 ">
      <div className="">
        <Link to="/" className="font-medium text-lg ">
          NDSoftTech Assignment
        </Link>
      </div>
      <div className="flex flex-row items-center  gap-2">
        <Button icon={Moon} variant="icon" />
        {openProfile &&
          createPortal(
            <div
              ref={menuRef}
              className="fixed top-16 right-4 z-50 bg-white border border-gray rounded-lg shadow-md p-4 w-48"
            >
              <h2 className="text-lg font-semibold mb-2">Profile</h2>
              <Button
                label="Logout"
                variant="danger"
                className="text-danger w-full"
              />
            </div>,
            document.getElementById("root")
          )}
        <Button
          icon={UserCircle}
          variant="icon"
          onClick={() => setOpenProfile(!openProfile)}
        />
      </div>
    </div>
  );
};

export default Navbar;
