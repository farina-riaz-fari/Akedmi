import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CompanyContext } from "../../store/CompanyContext";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import {
  Card,
  Input,
  Label,
  ReadonlyField,
  Select,
} from "../Partner/CommonComponent/PartnerComponent";
import UserContext from "../../store/UserContext";

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingUser = location.state?.student;

  const { addUser, updateUser } = useContext(UserContext);
  const { companies } = useContext(CompanyContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    dateOfBirth: "",
    gender: "",
    companyId: "",
    role: "",
    dateJoined: "",
    status: "Active",
    isVerified: true,
    userId: "",
    twoFactorEnabled: true,
    createdAt: "",
    updatedAt: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const now = new Date().toISOString();
    if (editingUser) {
      setFormData({
        ...editingUser,
        confirmPassword: editingUser.password,
        profilePicture: editingUser.profilePicture || null,
        createdAt: editingUser.createdAt || now,
        updatedAt: editingUser.updatedAt || now,
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        createdAt: now,
        updatedAt: "",
      }));
    }
  }, [editingUser]);

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else if (type === "file") {
      const file = e.target.files?.[0] ?? null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.companyId) newErrors.companyId = "Company is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.dateJoined) newErrors.dateJoined = "Date joined is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToError = () => {
    const firstErrorField = Object.keys(errors)[0];
    const element = document.getElementsByName(firstErrorField)[0];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      scrollToError();
      return;
    }

    const now = new Date().toISOString();
    const finalUserId = formData.userId || uuidv4();

    let profilePictureBase64 = null;
    if (formData.profilePicture instanceof File) {
      profilePictureBase64 = await convertToBase64(formData.profilePicture);
    } else if (typeof formData.profilePicture === "string") {
      profilePictureBase64 = formData.profilePicture;
    }

    const userData = {
      ...formData,
      profilePicture: profilePictureBase64,
      userId: finalUserId,
      createdAt: formData.createdAt || now,
      updatedAt: now,
    };

    editingUser ? updateUser(userData) : addUser(userData);
    navigate("/users");
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 lg:mt-0 mb-6">
        <Navbar title={editingUser ? "Edit User Data" : "Add New User"} />
        <ProfileGroup gap="gap-10" />
      </div>
      <form onSubmit={handleSubmit}>
        <Card title="User Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name *"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input
              label="Last Name *"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <Input
              label="Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              error={errors.email}
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Input
              label="Password *"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              error={errors.password}
            />
            <Input
              label="Confirm Password *"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              type="password"
              error={errors.confirmPassword}
            />
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              label="Date of Birth *"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              type="date"
              error={errors.dateOfBirth}
            />
            <Select
              label="Gender *"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
              error={errors.gender}
            />
          </div>

          <div className="mt-6">
            <Label text="Photo" />
            <div
              className="h-[170px] w-[170px] border-2 border-[#C1BBEB] border-dashed flex items-center justify-center cursor-pointer"
              onClick={() =>
                document.getElementById("profile-upload-input")?.click()
              }
            >
              {formData.profilePicture ? (
                <img
                  src={
                    typeof formData.profilePicture === "string"
                      ? formData.profilePicture
                      : URL.createObjectURL(formData.profilePicture)
                  }
                  alt="Profile"
                  className="w-[170px] h-[170px] object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-400 text-sm text-center">
                  Click to Upload
                </span>
              )}
            </div>
            <input
              id="profile-upload-input"
              type="file"
              name="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setFormData((prev) => ({ ...prev, profilePicture: file }));
              }}
            />
          </div>
        </Card>

        <Card title="Company & Role Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Company *"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              options={companies.map((c) => c.companyName)}
              error={errors.companyId}
            />
            <Select
              label="Role *"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={["Owner", "Partner", "Employee"]}
              error={errors.role}
            />
            <Input
              label="Date Joined *"
              name="dateJoined"
              value={formData.dateJoined}
              onChange={handleChange}
              type="date"
              error={errors.dateJoined}
            />
            <Select
              label="Status *"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Active", "Inactive", "Suspended"]}
              error={errors.status}
            />
            <Select
              label="Is Verified *"
              name="isVerified"
              value={formData.isVerified ? "Yes" : "No"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isVerified: e.target.value === "Yes",
                }))
              }
              options={["Yes", "No"]}
              placeholder={false}
            />
          </div>
        </Card>

        <Card title="Authentication & Security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Two-Factor Enabled *"
              name="twoFactorEnabled"
              value={formData.twoFactorEnabled ? "Yes" : "No"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  twoFactorEnabled: e.target.value === "Yes",
                }))
              }
              options={["Yes", "No"]}
              placeholder={false}
            />
          </div>
        </Card>

        <Card title="Timestamps">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadonlyField
              label="Created At"
              value={new Date(formData.createdAt).toLocaleString()}
            />
            {editingUser && (
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
                onClick={() => navigate("/users")}
                className="px-6 sm:px-12"
              />
            </div>
            <div className="flex">
              <Button
                type="submit"
                text={editingUser ? "Update User" : "Submit"}
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

export default UserForm;
