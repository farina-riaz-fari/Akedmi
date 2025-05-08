import React, { useContext, useState } from "react";
import { FaEdit, FaPlus, FaSortDown, FaTrashAlt } from "react-icons/fa";
import { EmployeeContext } from "../../store/EmployeeContext";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Searchbar from "../../components/Searchbar";
import Button from "../../components/Button";
import TableWithPagination from "../../components/Table";
import DeletePopup from "../../components/DeletePopup/deletepopup";

const Employee = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employment_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employee_code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleDelete = () => {
    if (selectedCompany) {
      deleteEmployee(selectedCompany.employee_code);
    }
    setShowDeletePopup(false);
  };

  const handleCancel = () => {
    setShowDeletePopup(false);
  };

  const columns = [
    {
      key: "first_name",
      label: "Name",
      render: (employee) => (
        <span className="font-bold text-[#303972] capitalize text-left block break-all">
          {employee.first_name} {employee.last_name}
        </span>
      ),
    },
    {
      key: "employee_code",
      label: "Employee Code",
      render: (employee) => (
        <span className="break-all">{employee.employee_code}</span>
      ),
    },
    {
      key: "job_title",
      label: "Job Title",
      render: (employee) => (
        <span className="capitalize">{employee.job_title}</span>
      ),
    },
    { key: "employment_type", label: "Employment Type" },
    {
      key: "status",
      label: "Status",
      render: (employee) => (
        <span
          className={`px-6 text-center py-3 rounded-full text-md font-medium whitespace-nowrap capitalize ${
            employee.status?.toLowerCase() === "active"
              ? "bg-green-200 text-green-800"
              : employee.status?.toLowerCase() === "resigned"
              ? "bg-red-200 text-red-800"
              : employee.status?.toLowerCase() === "terminated"
              ? "bg-blue-200 text-blue-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {employee.status}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (employee) => (
        <div className="flex justify-center gap-4">
          <button
            className="p-3 rounded-full bg-[#4D44B51A]"
            onClick={() => navigate("/addEmployee", { state: { employee } })}
          >
            <FaEdit className="text-[#4D44B5] text-[20px]" />
          </button>
          <button
            className="p-3 rounded-full bg-[#4D44B51A]"
            onClick={() => {
              setSelectedCompany(employee);
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
      <div className="flex-1 bg-[#F3F4FF] p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
          <Navbar title="Employee" />
          <ProfileGroup gap="gap-10" />
        </div>

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
                text="Add Employee"
                iconPrefix={<FaPlus />}
                onClick={() => navigate("/addEmployee")}
                hasBackground={true}
                bgColor="#4D44B5"
                className="text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-10 lg:w-[658px] w-full xl:w-full">
          <TableWithPagination
            columns={columns}
            data={filteredEmployees}
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

export default Employee;
