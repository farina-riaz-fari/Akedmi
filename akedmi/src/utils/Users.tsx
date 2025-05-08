import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContext";
import { EmployeeContext } from "../../store/EmployeeContext";
import { PartnerContext } from "../../store/PartnerContext";
import TableWithPagination from "../../components/Table";
import placeholderImage from "../../assets/placeholder (1).png";
import { FaEdit, FaPlus, FaSortDown, FaTrashAlt } from "react-icons/fa";
import DeletePopup from "../../components/DeletePopup/deletepopup";
import Searchbar from "../../components/Searchbar";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Button from "../../components/Button";

const User: React.FC = () => {
  const { users, deleteUser } = useContext(UserContext);
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const { partners, deletePartner } = useContext(PartnerContext);

  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const userEmployeeCodes = new Set(users.map((user) => user.userId));
  const employeeAsUsers = employees
    .filter((emp) => !userEmployeeCodes.has(emp.employee_code))
    .map((emp) => ({
      userId: emp.employee_code,
      firstName: emp.first_name,
      lastName: emp.last_name,
      email: emp.email || "N/A",
      gender: emp.gender || "N/A",
      companyId: emp.company || "N/A",
      employmentType: emp.employment_type || "N/A",
      role: emp.role || "Employee",
      status: emp.status || "Active",
      profilePicture: emp.profileImage || placeholderImage,
    }));

  const userPartnerCodes = new Set(users.map((user) => user.userId));
  const partnerAsUsers = partners
    .filter((pt) => !userPartnerCodes.has(pt.userId))
    .map((pt) => ({
      userId: pt.userId,
      firstName: pt.firstName,
      lastName: pt.lastName,
      email: pt.email || "N/A",
      gender: pt.gender || "N/A",
      companyId: pt.companyId || "N/A",
      employmentType: "Partner",
      role: pt.role || "Partner",
      status: pt.status || "Active",
      profilePicture: pt.profileImage || placeholderImage,
    }));

  const allUsers = [...users, ...partnerAsUsers, ...employeeAsUsers];

  const getStatusStyle = (rawStatus: string = "") => {
    const normalizedStatus = rawStatus.toLowerCase();
    const statusMap: Record<string, string> = {
      active: "active",
      "on duty": "active",
      resigned: "suspended",
      suspended: "suspended",
      terminated: "terminated",
      inactive: "inactive",
    };
    const statusType = statusMap[normalizedStatus] ?? "unknown";
    const statusStyles: Record<string, string> = {
      active: "bg-green-200 text-green-800",
      unknown: "bg-yellow-200 text-yellow-800",
      terminated: "bg-blue-200 text-blue-800",
      inactive: "bg-gray-200 text-gray-800",
      suspended: "bg-red-200 text-red-800",
    };
    return statusStyles[statusType];
  };

  const filteredUsers = allUsers.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.userId} `
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEdit = (user: any) => {
    const isUser = users.some((u) => u.userId === user.userId);
    const isEmployee = employees.some((e) => e.employee_code === user.userId);
    const isPartner = partners.some((p) => p.userId === user.userId);

    if (isUser && !isEmployee && !isPartner) {
      navigate("/add-user", { state: { student: user } });
    } else if (isEmployee) {
      const completeEmployee = {
        employee_code: user.userId,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        gender: user.gender,
        company: user.companyId,
        employment_type: user.employmentType || "",
        job_title: user.role,
        status: user.status,
        address: "",
        national_id: "",
        passport_number: "",
        phone_number: "",
        department_id: "",
        hire_date: new Date().toISOString(),
        termination_date: "",
        salary: "",
        bank_account_number: "",
        bank_name: "",
        tax_identification_number: "",
        is_tax_exempt: "false",
        payment_method: "Bank Transfer",
        profileImage: user.profilePicture,
        ...employees.find((emp) => emp.employee_code === user.userId),
      };
      navigate("/addEmployee", {
        state: { employee: completeEmployee, returnPath: "/users" },
      });
    } else if (isPartner) {
      const matchedPartner = partners.find((p) => p.userId === user.userId);
      const completePartner = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        companyId: user.companyId || "",
        role: user.role || "",
        name: user.name || "",
        address: user.address || "",
        country: user.country || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        taxId: user.taxId || "",
        isVerified: user.isVerified ?? true,
        agreementSigned: user.agreementSigned ?? true,
        agreementDocument: user.agreementDocument || "",
        status: user.status || "Active",
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.updatedAt || "",
        ...matchedPartner,
      };

      navigate("/add-partner", {
        state: { partner: completePartner, returnPath: "/users" },
      });
    } else {
      navigate("/add-user", { state: { student: user } });
    }
  };

  const handleConfirmDelete = () => {
    selectedItems.forEach((id) => {
      deleteUser(id);
      deleteEmployee(id);
      deletePartner(id);
    });
    setSelectedItems([]);
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const columns = [
    {
      key: "fullName",
      label: "Name",
      render: (user: any) => (
        <div className="flex items-center space-x-2">
          <img
            src={user.profilePicture || placeholderImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <span className="font-bold capitalize">
            {user.firstName} {user.lastName}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (user: any) => (
        <div className="text-center break-all">{user.email}</div>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      render: (user: any) => <div className="text-center">{user.gender}</div>,
    },
    {
      key: "companyId",
      label: "Company",
      render: (user: any) => (
        <div className="text-center font-semibold text-[#303972]">
          {user.companyId}
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: any) => <div className="text-center">{user.role}</div>,
    },
    {
      key: "status",
      label: "Status",
      render: (user: any) => (
        <div className="text-center">
          <span
            className={`px-6 py-3 rounded-full font-medium text-md ${getStatusStyle(
              user.status
            )}`}
          >
            {user.status}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Action",
      render: (user: any) => (
        <div className="flex justify-center space-x-4">
          <div
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleEdit(user)}
          >
            <FaEdit size={20} color="#4D44B5" />
          </div>
          <div
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              setSelectedItems([user.userId]);
              setShowDeletePopup(true);
            }}
          >
            <FaTrashAlt className="text-[#4D44B5]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-10 flex-1 min-h-screen bg-[#F3F4FF]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
        <Navbar title="User" />
        <ProfileGroup gap="gap-10" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 w-full">
        <div className="w-full sm:w-auto md:w-auto">
          <Searchbar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full h-[54px]">
          <div className="flex">
            <Button
              text="Newest"
              iconPostfix={<FaSortDown className="text-[16px] mb-[6px]" />}
              hasBorder={true}
              borderColor="#4D44B5"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          </div>
          <div className="flex">
            <Button
              text="Add User"
              iconPrefix={<FaPlus />}
              onClick={() => navigate("/add-user")}
              hasBackground={true}
              bgColor="#4D44B5"
              className="text-white"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 lg:mt-10">
        <TableWithPagination
          columns={columns}
          data={filteredUsers}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default User;
