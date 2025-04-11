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
        <div className="bg-[#4D44B5] flex justify-center pt-8 pb-8 h-full">
            <div className="lg:hidden p-4" onClick={toggleSidebar}>
                <button className="text-white">
                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <aside className="lg:flex hidden flex-col items-center w-full transition-all duration-300">
                <div className="flex gap-4 justify-center items-center px-6">
                    <div className="bg-[#FB7D5B] px-2.5 pb-[2px] flex justify-center items-center rounded-2xl">
                        <span className="text-white font-bold text-3xl lg:text-2xl xl:text-3xl">A</span>
                    </div>
                    <span className="text-white text-3xl lg:text-2xl xl:text-3xl font-bold">Akademi</span>
                </div>

                <div className="flex justify-center items-center pt-6 pb-6 w-full">
                    <ul className="space-y-2 font-medium w-full">
                        {menuItems.map(({ to, label, icon }) => (
                            <li
                                key={to}
                                className={`ml-4 lg:ml-4 xl:ml-12 3xl:ml-24 4xl:ml-40 rounded-tl-full rounded-bl-full ${isActiveTab(to) ? "bg-white text-[#4D44B5]" : "hover:bg-white hover:text-[#4D44B5]"
                                    }`}
                            >
                                <Link to={to} className="flex items-center p-3 pl-4 text-[#C1BBEB] group w-full">
                                    <span className={`text-[24px] lg:text-[20px] xl:text-[28px] ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                        {icon}
                                    </span>
                                    <span className={`ms-3 text-lg lg:text-sm xl:text-base font-medium ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                        {label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center py-20">
                    <span className="font-bold text-[14px] text-white">Akademi - School Admission Dashboard</span>
                    <span className="font-bold text-[14px] text-white">Made with ♥ by Peterdraw</span>
                </div>
            </aside>

            <div
                ref={sidebarRef}
                className={`lg:hidden fixed top-0 left-0 md:w-[40%] xs:w-[80%] h-full bg-[#4D44B5] z-10 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <aside className="flex flex-col items-center w-full transition-all duration-300 pt-16">
                    <div className="flex gap-4 justify-center items-center pb-8">
                        <div className="bg-[#FB7D5B] px-2.5 pb-[2px] flex justify-center items-center rounded-2xl">
                            <span className="text-white font-bold text-7xl md:text-5xl">A</span>
                        </div>
                        <span className="text-white text-7xl md:text-5xl font-bold">Akademi</span>
                    </div>

                    <ul className="space-y-6 font-medium w-full">
                        {menuItems.map(({ to, label, icon }) => (
                            <li
                                key={to}
                                className={`ml-64 ss:ml-36 sss:ml-24 xs:ml-72 md:ml-28 rounded-tl-full rounded-bl-full ${isActiveTab(to) ? "bg-white text-[#4D44B5]" : "hover:bg-white hover:text-[#4D44B5]"
                                    }`}
                            >
                                <Link to={to} className="flex items-center p-3 pl-4 text-[#C1BBEB] group w-full">
                                    <span className={`text-5xl md:text-3xl ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                        {icon}
                                    </span>
                                    <span className={`ms-3 text-5xl md:text-3xl font-medium ${isActiveTab(to) ? "text-[#4D44B5]" : "group-hover:text-[#4D44B5]"}`}>
                                        {label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col items-center py-20">
                        <span className="font-bold text-[14px] text-white">Akademi - School Admission Dashboard</span>
                        <span className="font-bold text-[14px] text-white">Made with ♥ by Peterdraw</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Sidebar;
