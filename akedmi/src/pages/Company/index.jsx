import React, { useContext, useState } from "react";
import { FaEdit, FaPlus, FaSortDown, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Searchbar from "../../components/Searchbar";
import { CompanyContext } from "../../store/CompanyContext";
import Button from "../../components/Button";
import TableWithPagination from "../../components/Table";
import DeletePopup from "../../components/DeletePopup/deletepopup";

const Company = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const navigate = useNavigate();

  const { companies, deleteCompany } = useContext(CompanyContext);

  const filteredCompanies = companies.filter((company) =>
    [company.companyName, company.email, company.country].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getStatusClass = (status) => {
    const normalized = status.toLowerCase();
    if (normalized === "active")
      return "bg-green-200 font-medium text-green-800";
    if (normalized === "suspended")
      return "bg-red-200 font-medium text-red-800";
    return "bg-gray-200 font-medium text-gray-600";
  };

  const handleDelete = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.email);
    }
    setShowDeletePopup(false);
  };

  const handleCancel = () => {
    setShowDeletePopup(false);
  };

  const columns = [
    {
      key: "companyName",
      label: "Company Name",
      render: (company) => (
        <span className="font-bold text-[#303972] capitalize text-left block">
          {company.companyName}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (company) => <span className="break-all">{company.email}</span>,
    },
    {
      key: "currency",
      label: "Currency",
      render: (company) => (
        <span className="break-all">{company.currency}</span>
      ),
    },
    { key: "country", label: "Country" },
    { key: "owner", label: "Owner" },
    {
      key: "status",
      label: "Status",
      render: (company) => (
        <span
          className={`px-6 py-3 rounded-full font-md capitalize ${getStatusClass(
            company.status
          )}`}
        >
          {company.status}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (company) => (
        <div className="flex justify-center gap-4">
          <button
            className="p-3 rounded-full bg-[#4D44B51A]"
            onClick={() => navigate("/addCompany", { state: { company } })}
          >
            <FaEdit className="text-[#4D44B5] text-[20px]" />
          </button>
          <button
            className="p-3 rounded-full bg-[#4D44B51A]"
            onClick={() => {
              setSelectedCompany(company);
              setShowDeletePopup(true);
            }}
          >
            <FaTrashAlt className="text-[#4D44B5] text-[20px]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 bg-[#F3F4FF] p-4 sm:p-6 lg:p-8 2xl:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
          <Navbar title="Company" />
          <ProfileGroup gap="gap-10" />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 w-full">
          <div className="w-full sm:w-auto md:w-auto">
            <Searchbar value={searchQuery} onChange={handleSearchChange} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full h-[54px]">
            <div className="flex">
              <Button
                text="Newest"
                iconPostfix={<FaSortDown className="text-[16px] mb-[6px]" />}
                hasBorder={true}
                borderColor="#4D44B5"
              />
            </div>

            <div className="flex">
              <Button
                text="Add Company"
                iconPrefix={<FaPlus />}
                onClick={() => navigate("/addCompany")}
                hasBackground={true}
                bgColor="#4D44B5"
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-16 sm:mt-10 lg:w-[658px] w-full xl:w-full">
          <TableWithPagination
            columns={columns}
            data={filteredCompanies}
            itemsPerPage={8}
          />
        </div>
      </div>
      {showDeletePopup && (
        <DeletePopup onConfirm={handleDelete} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Company;
