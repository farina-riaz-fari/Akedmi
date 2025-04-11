import React, { useContext } from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Searchbar from "../../components/Searchbar";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaPlus, FaSortDown, FaTrashAlt } from "react-icons/fa";
import Next from "../../assets/next.png";
import Prev from "../../assets/prev.png";
import { CompanyContext } from "../../store/CompanyContext";
import { useNavigate } from "react-router";

const Company = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const { companies, removeCompany } = useContext(CompanyContext);
    const navigate = useNavigate();
    const filteredCompanies = companies.filter(company =>
    (company.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (company.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (company.country?.toLowerCase() || '').includes(searchQuery.toLowerCase()))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1) {
            setCurrentPage(1);
        } else if (pageNumber > totalPages) {
            setCurrentPage(totalPages);
        } else {
            setCurrentPage(pageNumber);
        }
    };

    const handleDelete = (email) => {
        removeCompany(email);
    };


    return (
        <div className="flex w-full h-screen">
            <div className="w-[15%] lg:w-[20%]">
                <Sidebar />
            </div>
            <div className="flex-1 bg-[#F3F4FF] pt-8 px-4 md:px-6 lg:px-10">
                <div className="flex flex-row justify-between items-center w-full gap-4">
                    <div className="w-auto">
                        <Navbar title="Company" />
                    </div>
                    <div className="w-auto flex justify-end">
                        <ProfileGroup gap="gap-10" />
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 flex-wrap gap-4">
                    <Searchbar value={searchQuery} onChange={handleSearchChange} />
                    <div className="flex items-center gap-4">
                        <div className="flex-1 border-2 border-[#4D44B5] rounded-full">
                            <button className="flex items-center justify-center gap-2 w-full px-6 py-2 text-[#4D44B5] text-md font-bold whitespace-nowrap">
                                Newest
                                <FaSortDown className="text-[16px] mb-[6px]" />
                            </button>
                        </div>
                        <div className="flex bg-[#4D44B5] rounded-full">
                            <button
                                className="flex items-center justify-center gap-2 w-full px-6 py-[10px] text-white text-md font-bold whitespace-nowrap"
                                onClick={() => window.location.href = "/company/newCompany"}
                            >
                                <FaPlus />
                                New Company
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-4">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-md text-gray-700 bg-white border-b">
                            <tr>
                                <th scope="col" className="px-6 py-8">Company Name</th>
                                <th scope="col" className="px-6 py-8">ID</th>
                                <th scope="col" className="px-6 py-8">Email</th>
                                <th scope="col" className="px-6 py-8">Registration No.</th>
                                <th scope="col" className="px-6 py-8">Country</th>
                                <th scope="col" className="px-6 py-8">Owner ID</th>
                                <th scope="col" className="px-6 py-8">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCompanies.length > 0 ? (
                                currentCompanies.map((company) => (
                                    <tr key={company.id} className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-8 font-medium text-gray-900 whitespace-nowrap">
                                            <div className="flex flex-row w-full">
                                                <div className="flex flex-col justify-center items-start ps-4">
                                                    <div className="text-md font-bold text-[#303972]">{company.companyName}</div>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-8 text-[#4D44B5] font-[600]">{company.id}</td>
                                        <td className="px-6 py-8">{company.email}</td>
                                        <td className="px-6 py-8 text-[#303972]">{company.registrationNo}</td>
                                        <td className="px-6 py-8 text-[#303972]">{company.country}</td>
                                        <td className="px-6 py-8 text-[#303972]">{company.ownerId}</td>
                                        <td className="px-6 py-8 text-[#303972]">
                                            <button
                                                className={`flex flex-row text-center text-md font-[400] justify-center items-center gap-4 p-2 px-6 rounded-full 
                                                ${company.status === "Active" ? "bg-green-200 text-green-800 font-bold" : company.status === "Suspended" ? "bg-red-200 text-red-800 font-bold" : "bg-gray-200 text-gray-600 font-bold"}`}
                                            >
                                                {company.status}
                                            </button>
                                        </td>
                                        <td className="flex justify-start items-center gap-4 py-8 mr-4">
                                            <button className="rounded-full p-3 bg-[#4D44B51A]" onClick={() => navigate("/company/newCompany", { state: { company } })}>
                                                <FaEdit className="text-[#4D44B5] text-[20px]" />
                                            </button>
                                            <button className="rounded-full p-3 bg-[#4D44B51A]" onClick={() => handleDelete(company.email)} >
                                                <FaTrashAlt className="text-[#4D44B5] text-[20px]" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No companies found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end py-4 pb-16">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-white rounded-full mx-2"
                    >
                        <img src={Prev} alt="Prev Button" />
                    </button>
                    <div className="flex space-x-2">
                        {currentPage > 2 && (
                            <div
                                onClick={() => setCurrentPage(1)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${currentPage === 1 ? "bg-[#4D44B5] text-white" : "bg-transparent text-[#4D44B5]"}`}
                            >
                                1
                            </div>
                        )}
                        {currentPage > 3 && (
                            <div
                                onClick={() => setCurrentPage(2)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${currentPage === 2 ? "bg-[#4D44B5] text-white" : "bg-transparent text-[#4D44B5]"}`}
                            >
                                2
                            </div>
                        )}
                        {currentPage > 3 && currentPage < totalPages - 1 && (
                            <div className="w-10 h-10 flex items-center justify-center">
                                ...
                            </div>
                        )}
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            if (pageNumber === currentPage || pageNumber === currentPage - 1 || pageNumber === currentPage + 1) {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${currentPage === pageNumber ? "bg-[#4D44B5] text-white" : "bg-transparent text-[#4D44B5]"}`}
                                    >
                                        {pageNumber}
                                    </div>
                                );
                            }
                            return null;
                        })}
                        {currentPage < totalPages - 1 && (
                            <div
                                onClick={() => setCurrentPage(totalPages)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${currentPage === totalPages ? "bg-[#4D44B5] text-white" : "bg-transparent text-[#4D44B5]"}`}
                            >
                                ...
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-white rounded-full mx-2"
                    >
                        <img src={Next} alt="Next Button" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Company;
