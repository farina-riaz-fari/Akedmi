import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PartnerContext } from "../../store/PartnerContext";
import { FaEdit, FaPlus, FaSortDown, FaTrashAlt } from "react-icons/fa";
import DeletePopup from "../../components/DeletePopup/deletepopup";
import Searchbar from "../../components/Searchbar";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import TableWithPagination from "../../components/Table/index";

const Partner = () => {
  const { partners, deletePartner } = useContext(PartnerContext);
  const [search, setSearch] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const filteredPartners = useMemo(
    () =>
      partners.filter((partner) =>
        `${partner.firstName || ""} ${partner.lastName || ""} ${
          partner.address || ""
        } ${partner.city || ""} ${partner.country || ""} ${
          partner.zipCode || ""
        } ${partner.taxId || ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [partners, search]
  );

  const columns = [
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    { key: "isVerified", label: "Verified" },
    { key: "action", label: "Action" },
  ];

  const tableData = filteredPartners.map((partner) => ({
    name: (
      <span className="font-bold text-[#303972] capitalize text-left block">
        {partner.firstName} {partner.lastName}
      </span>
    ),
    address: partner.address,
    country: partner.country,
    city: partner.city,
    isVerified: (
      <span
        className={`font-medium text-md px-7 py-3 rounded-full font-medium ${
          partner.isVerified
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {partner.isVerified ? "True" : "False"}
      </span>
    ),
    action: (
      <div className="flex justify-center space-x-4">
        <div
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handleEdit(partner)}
        >
          <FaEdit size={20} color="#4D44B5" />
        </div>
        <div
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handleDeleteClick(partner.userId)}
        >
          <FaTrashAlt className="text-[#4D44B5]" />
        </div>
      </div>
    ),
  }));

  const handleEdit = (partner) => {
    navigate("/add-partner", { state: { partner } });
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deletePartner(selectedUserId);
      setShowDeletePopup(false);
      setSelectedUserId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedUserId(null);
  };

  return (
    <div className="p-4 sm:p-10 flex-1 min-h-screen bg-[#F3F4FF]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
        <Navbar title="Partner" />
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
              text="Add Partner"
              iconPrefix={<FaPlus />}
              onClick={() => navigate("/add-partner")}
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
          data={tableData}
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

export default Partner;
