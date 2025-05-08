import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PartnerContext } from "../../store/PartnerContext";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  Select,
  ReadonlyField,
  Card,
} from "./CommonComponent/PartnerComponent";
import Button from "../../components/Button";
import ProfileGroup from "../../components/ProfileGroup";
import Navbar from "../../components/Navbar";
import { CompanyContext } from "../../store/CompanyContext";

const PartnerForm = () => {
  const navigate = useNavigate();
  const { companies } = useContext(CompanyContext);

  const location = useLocation();
  const editingPartner = location.state?.partner;
  const returnPath = location.state?.returnPath;

  const { addPartner, updatePartner } = useContext(PartnerContext);

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    companyId: "",
    company: "",
    role: "",
    name: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    taxId: "",
    isVerified: true,
    agreementSigned: true,
    agreementDocument: "",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const roles = ["Manager", "Employee", "Director"];

  useEffect(() => {
    const now = new Date().toISOString();
    if (editingPartner) {
      setFormData({
        ...editingPartner,
        createdAt: editingPartner.createdAt || now,
        updatedAt: editingPartner.updatedAt || "",
        profileImage: editingPartner.profileImage || "",
      });

      setProfileImage(editingPartner.profileImage || null);
    }
  }, [editingPartner]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const parsedValue =
      value === "true" ? true : value === "false" ? false : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.agreementSigned)
      newErrors.agreementSigned = "Agreement must be signed";
    if (formData.isVerified === null || formData.isVerified === undefined)
      newErrors.isVerified = "Verification status is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.companyId) newErrors.companyId = "Company is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToError = () => {
    const firstErrorField = Object.keys(errors)[0];
    const element = document.getElementsByName(firstErrorField)[0];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      scrollToError();
      return;
    }

    const now = new Date().toISOString();
    const finalUserId = formData.userId || uuidv4();

    const partnerData = {
      ...formData,
      userId: finalUserId,
      createdAt: formData.createdAt || now,
      profileImage: profileImage || formData.profileImage || "",
    };

    const isEdit = !!editingPartner;

    const isChanged =
      !editingPartner ||
      Object.keys(partnerData).some((key) => {
        return partnerData[key] !== editingPartner[key];
      });

    if (isChanged) {
      partnerData.updatedAt = now;
    } else {
      partnerData.updatedAt = editingPartner?.updatedAt || "";
    }

    try {
      if (isEdit) {
        await updatePartner(partnerData);
      } else {
        await addPartner(partnerData);
      }
      navigate(returnPath || "/partner");
    } catch (error) {
      console.error("Failed to submit partner data:", error);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 lg:mt-0 mb-6">
        <Navbar
          title={editingPartner ? "Edit Partner Data" : "Add Partner Data"}
        />
        <ProfileGroup gap="gap-10" />
      </div>

      <form onSubmit={handleSubmit}>
        <Card title="Partner Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name *"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter first name"
              error={errors.firstName}
            />
            <Input
              label="Last Name *"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter last name"
              error={errors.lastName}
            />
            <Input
              label="Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              error={errors.email}
            />
            <Select
              label="Gender *"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
              required
              placeholder="Select gender"
              error={errors.gender}
            />
          </div>

          <div className="mt-6 flex flex-col ">
            <label className="relative w-40 h-40 border-2 border-dashed border-[#C1BBEB] flex items-center justify-center cursor-pointer ">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm text-center">
                  Click to upload photo
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </Card>

        <Card title="Company & Financial Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Company *"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              placeholder="Select company"
              options={companies.map((c) => c.companyName)}
              error={errors.companyId}
            />
            <Select
              label="Role *"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roles}
              required
              placeholder="Select role"
              error={errors.role}
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              optional
              placeholder="Enter address"
            />
            <Input
              label="Country *"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Enter country"
              error={errors.country}
            />
            <Input
              label="City *"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter city"
              error={errors.city}
            />
          </div>
        </Card>

        <Card title="Business Relationship">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Status *"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Active", "Inactive", "Pending"]}
              required
              placeholder="Select status"
              error={errors.status}
            />
            <Select
              label="Is Verified? *"
              name="isVerified"
              value={formData.isVerified.toString()}
              onChange={handleChange}
              options={["true", "false"]}
              required
              placeholder="Select verification status"
              error={errors.isVerified}
            />
            <Select
              label="Agreement Signed? *"
              name="agreementSigned"
              value={formData.agreementSigned.toString()}
              onChange={handleChange}
              options={["true", "false"]}
              required
              placeholder="Select agreement status"
              error={errors.agreementSigned}
            />
            <Input
              label="Agreement Document URL"
              name="agreementDocument"
              value={formData.agreementDocument}
              onChange={handleChange}
              optional
              placeholder="Enter agreement document URL"
            />
          </div>
        </Card>

        <Card title="Timestamps">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadonlyField
              label="Created At"
              value={new Date(formData.createdAt).toLocaleString()}
            />
            {editingPartner && (
              <ReadonlyField
                label="Updated At"
                value={
                  formData.updatedAt
                    ? new Date(formData.updatedAt).toLocaleString()
                    : "Not updated yet"
                }
              />
            )}
          </div>
        </Card>

        <div className="flex gap-2 ss:gap-6 justify-center sm:justify-end py-2 sm:py-4 pb-8 sm:pb-16 mt-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex">
              <Button
                text="Cancel"
                hasBorder={true}
                borderColor="#4D44B5"
                onClick={() => navigate(returnPath || "/partner")}
                className="px-6 sm:px-12"
              />
            </div>
            <div className="flex">
              <Button
                type="submit"
                text={editingPartner ? "Update Partner" : "Submit"}
                hasBackground={true}
                bgColor="#4D44B5"
                className="text-white px-6 sm:px-12"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PartnerForm;
