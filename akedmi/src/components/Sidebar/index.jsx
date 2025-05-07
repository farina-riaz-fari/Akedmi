import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaTasks,
  FaHandsHelping,
  FaChartBar,
  FaMoneyBillAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { FaUserGroup } from "react-icons/fa6";
import { FaThLarge } from "react-icons/fa";

const sidebarItems = [
  { id: 1, icon: <FiHome />, label: "Dashboard", path: "/" },
  { id: 2, icon: <FaBuilding />, label: "Company", path: "/company" },
  { id: 3, icon: <FaUser />, label: "Users", path: "/users" },
  { id: 4, icon: <FaTasks />, label: "Project", path: "/project" },
  { id: 5, icon: <FaUserGroup />, label: "Employee", path: "/employee" },
  { id: 6, icon: <FaHandsHelping />, label: "Partner", path: "/partner" },
  {
    id: 7,
    icon: <FaThLarge />,
    label: "Product Category",
    path: "/product-category",
  },
  { id: 8, icon: <AiOutlineProduct />, label: "Products", path: "/products" },
  { id: 9, icon: <FaChartBar />, label: "Chart of Account", path: "/chart" },
  { id: 10, icon: <FaMoneyBillAlt />, label: "Payroll", path: "/payroll" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-[#4D44B5] p-1 rounded"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bg-[#4D44B5] h-screen text-white z-40 transform
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
          w-[250px] lg:w-[300px] flex-col
        `}
      >
        {/* Logo & Heading */}
        <div className="flex items-center gap-3 mb-8 mt-12 ml-6 lg:ml-12 sm:mt-12">
          <div className="w-[34px] h-[34px] bg-[#FB7D5B] flex items-center justify-center text-white font-extrabold text-2xl rounded-md">
            E
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold">E-C-P</h2>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1 ml-6 md:ml-10 lg:ml-12">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 cursor-pointer transition-all rounded-l-[2rem] ${
                  isActive
                    ? "bg-white text-[#4D44B5]"
                    : "text-white hover:bg-white/10"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm md:text-base">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-auto ml-6 md:ml-8 mb-4">
          <div className="text-white text-[13px] md:text-[14px] font-bold">
            ERP - Multicompany Dashboard
          </div>
          <div className="text-white text-[13px] md:text-[14px] font-poppins font-normal flex items-center">
            Made with{" "}
            <span className="text-red-500 px-2">
              <IoMdHeart />
            </span>
            by Peterdraw
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
