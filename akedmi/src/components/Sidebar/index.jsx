import React, { useState, useEffect, useRef } from "react";
import { FiHome } from "react-icons/fi";
import { FaBuilding, FaProjectDiagram, FaUsers, FaUserTie, FaHandsHelping, FaBox, FaChartBar, FaMoneyBillAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { to: "/", label: "Dashboard", icon: <FiHome /> },
    { to: "/company", label: "Company", icon: <FaBuilding /> },
    { to: "/users", label: "Users", icon: <FaUsers /> },
    { to: "/project", label: "Project", icon: <FaProjectDiagram /> },
    { to: "/employee", label: "Employee", icon: <FaUserTie /> },
    { to: "/partner", label: "Partner", icon: <FaHandsHelping /> },
    { to: "/inventory", label: "Inventory Item", icon: <FaBox /> },
    { to: "/chart", label: "Chart Of Account", icon: <FaChartBar /> },
    { to: "/payroll", label: "Payroll", icon: <FaMoneyBillAlt /> },
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const isActiveTab = (tab) => location.pathname === tab;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-[#4D44B5] h-full w-[300px] md:w-fit">
            <div className="lg:hidden p-4 md:p-2 sss:p-0" onClick={toggleSidebar}>
                <button className="text-white">
                    <svg className="w-8 h-8 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col items-center h-full w-full pt-8 pb-8">
                <div className="flex gap-4 justify-center items-center px-6">
                    <div className="bg-[#FB7D5B] px-2.5 pb-[2px] flex justify-center items-center rounded-2xl">
                        <span className="text-white font-bold text-2xl xl:text-3xl">A</span>
                    </div>
                    <span className="text-white text-2xl xl:text-3xl font-bold">Akademi</span>
                </div>

                <ul className="space-y-2 font-medium w-full pt-6 ml-[30%] xl:ml-[50%] 4xl:ml-[70%]">
                    {menuItems.map(({ to, label, icon }) => (
                        <li
                            key={to}
                            className={`rounded-tl-full rounded-bl-full ${isActiveTab(to) ? "bg-white text-[#4D44B5]" : "hover:bg-white hover:text-[#4D44B5]"}`}
                        >
                            <Link to={to} className="flex items-center p-3 pl-4 text-[#C1BBEB] group w-full">
                                <span className={`text-xl ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                    {icon}
                                </span>
                                <span className={`ml-3 text-sm font-medium xl:text-lg 4xl:text-xl ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                    {label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col items-center mt-auto py-10 px-6 text-center">
                    <span className="font-bold text-sm text-white">Akademi - School Admission Dashboard</span>
                    <span className="font-bold text-sm text-white">Made with ♥ by Peterdraw</span>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div
                ref={sidebarRef}
                className={`lg:hidden fixed top-0 left-0 w-[60%] h-full bg-[#4D44B5] z-20 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out overflow-y-auto`}
            >
                <aside className="flex flex-col items-center w-full pt-16 px-6">
                    <div className="flex gap-4 justify-center items-center pb-8">
                        <div className="bg-[#FB7D5B] px-2.5 pb-[2px] flex justify-center items-center rounded-2xl">
                            <span className="text-white font-bold text-4xl">A</span>
                        </div>
                        <span className="text-white text-4xl font-bold">Akademi</span>
                    </div>

                    <ul className="space-y-4 font-medium w-full">
                        {menuItems.map(({ to, label, icon }) => (
                            <li
                                key={to}
                                className={`rounded-tl-full rounded-bl-full ${isActiveTab(to) ? "bg-white text-[#4D44B5]" : "hover:bg-white hover:text-[#4D44B5]"}`}
                            >
                                <Link to={to} className="flex items-center p-3 pl-4 text-[#C1BBEB] group w-full">
                                    <span className={`text-2xl ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                        {icon}
                                    </span>
                                    <span className={`ml-3 text-lg font-medium ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                        {label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col items-center mt-auto py-10 text-center">
                        <span className="font-bold text-sm text-white">Akademi - School Admission Dashboard</span>
                        <span className="font-bold text-sm text-white">Made with ♥ by Peterdraw</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Sidebar;
