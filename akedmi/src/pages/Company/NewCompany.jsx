import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { CompanyContext } from "../../store/CompanyContext";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "../../components/Input";
import { FormSelect } from "../../components/Select";
import { CurrencySelect } from "../../components/CurrencySelect";
import { DateTimeInput } from "../../components/DateAndTimeDropdown";
import Button from "../../components/Button";
// import { UserContext } from "../../store/UserContext";
// import { PartnerContext } from "../../store/PartnerContext";
// import { EmployeeContext } from "../../store/EmployeeContext";

const NewCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCompany, updateCompany } = useContext(CompanyContext);
  //   const { users } = useContext(UserContext);
  //   const { partners } = useContext(PartnerContext);
  //   const { employees } = useContext(EmployeeContext);
  const companyData = location.state?.company;
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    id: companyData?.id || uuidv4(),
    registrationNo: companyData?.registrationNo || "",
    companyName: companyData?.companyName || "",
    industry: companyData?.industry || "",
    city: companyData?.city || "",
    email: companyData?.email || "",
    phoneNumber: companyData?.phoneNumber || "",
    address: companyData?.address || "",
    country: companyData?.country || "",
    website: companyData?.website || "",
    zipCode: companyData?.zipCode || "",
    taxId: companyData?.taxId || "",
    currency: companyData?.currency || "PKR",
    status: companyData?.status || "Active",
    parentCompany: companyData?.parentCompany || "",
    registrationDate: companyData?.registrationDate || "",
    owner: companyData?.owner || "",
    businessType: companyData?.businessType || "",
    isVerified: companyData?.isVerified || "True",
    createdAt: companyData?.createdAt || new Date().toISOString(),
    updatedAt: companyData?.updatedAt || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const requiredFields = [
    "companyName",
    "industry",
    "email",
    "phoneNumber",
    "country",
    "city",
    "currency",
    "status",
    "registrationDate",
    "owner",
    "businessType",
    "isVerified",
    "createdAt",
  ];

  const fieldLabels = {
    companyName: "Company Name",
    industry: "Industry",
    email: "Email",
    phoneNumber: "Phone Number",
    country: "Country",
    city: "City",
    currency: "Currency",
    status: "Status",
    registrationDate: "Registration Date",
    owner: "Owner",
    businessType: "Business Type",
    isVerified: "Is Verified",
    createdAt: "Created At",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const label = fieldLabels[field] || field;
        newFormErrors[field] = `${label} is required.`;
      }
    });

    if (formData.email && !formData.email.includes("@")) {
      newFormErrors.email = "Please add '@' in the email.";
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);

      const firstErrorField = Object.keys(newFormErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }

      return;
    }

    setFormErrors({});

    if (companyData) {
      updateCompany({ ...formData, updatedAt: new Date().toISOString() });
    } else {
      addCompany(formData);
    }

    navigate("/company");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/company");
  };

  const renderSection = (title, children) => (
    <div className="flex flex-col w-full justify-center items-center py-4 pb-16">
      <div className="w-full rounded-t-xl p-4 pl-4 md:pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-lg md:text-xl">
        {title}
      </div>
      <div className="w-full rounded-b-xl py-4 px-2 sm:px-2 md:px-4 bg-white gap-10 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row py-4 gap-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full h-screen bg-[#F3F4FF]">
      <div className="flex-1 bg-[#F3F4FF] pt-8 px-4 md:px-6 lg:px-8 xl:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 lg:mt-0 mb-6">
          <Navbar
            title={companyData ? "Edit Company Data" : "Add New Company"}
          />
          <ProfileGroup gap="gap-10" />
        </div>

        <form onSubmit={handleSubmit} className="overflow-x-auto">
          {/* Basic Information */}
          {renderSection(
            "Company Basic Information",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Company Name"
                  name="companyName"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.companyName}
                />
                <FormInput
                  label="Registration Number"
                  name="registrationNo"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.registrationNo}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormSelect
                  label="Industry"
                  name="industry"
                  options={[
                    { value: "tech", label: "Tech" },
                    { value: "finance", label: "Finance" },
                    { value: "healthcare", label: "Healthcare" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.industry}
                />
              </div>
            </>
          )}

          {/* Contact Information */}
          {renderSection(
            "Contact Information",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Email"
                  name="email"
                  type="text"
                  required
                  disabled={!!companyData}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.email}
                />
                <FormInput
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.phoneNumber}
                />
                <FormInput
                  label="Country"
                  name="country"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.country}
                />
                <FormInput
                  label="Address"
                  name="address"
                  type="textarea"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Website"
                  name="website"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormInput
                  label="City"
                  name="city"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.city}
                />
                <FormInput
                  label="Zip Code"
                  name="zipCode"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Financial Information */}
          {renderSection(
            "Financial Information",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Tax ID"
                  name="taxId"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.taxId}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <CurrencySelect
                  label="Currency"
                  name="currency"
                  formData={formData}
                  setFormData={setFormData}
                  error={formErrors.currency}
                />
              </div>
            </>
          )}

          {/* Operational Details */}
          {renderSection(
            "Operational Details",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormSelect
                  label="Status"
                  name="status"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                    { value: "suspended", label: "Suspended" },
                  ]}
                  includeDefaultOption={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <DateTimeInput
                  label="Registration Date"
                  name="registrationDate"
                  formData={formData}
                  setFormData={setFormData}
                  error={formErrors.registrationDate}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormSelect
                  label="Parent Company"
                  name="parentCompany"
                  options={[
                    { value: "externalCompany", label: "External Company" },
                    { value: "selfReference", label: "Self-Reference" },
                    { value: "otherCompany", label: "Other Company" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.parentCompany}
                />
              </div>
            </>
          )}

          {/* Ownership & Compliance */}
          {renderSection(
            "Ownership & Compliance",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormSelect
                  label="Owner"
                  name="owner"
                  options={[
                    { value: "owner 1", label: "Owner 1" },
                    { value: "OtherOwner", label: "Other Owner" },
                    // ...users.map((c) => ({
                    //   value: c.firstName + " " + c.lastName,
                    //   label: c.firstName + " " + c.lastName,
                    // })),
                    // ...employees.map((e) => ({
                    //   value: e.first_name + " " + e.last_name,
                    //   label: e.first_name + " " + e.last_name,
                    // })),
                    // ...partners.map((p) => ({
                    //   value: p.firstName + " " + p.lastName,
                    //   label: p.firstName + " " + p.lastName,
                    // })),
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.owner}
                />
                <FormSelect
                  label="Business Type"
                  name="businessType"
                  options={[
                    { value: "private", label: "Private" },
                    { value: "public", label: "Public" },
                    { value: "nonProfit", label: "Non-Profit" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.businessType}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormSelect
                  label="Is Verified"
                  name="isVerified"
                  options={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" },
                  ]}
                  includeDefaultOption={false}
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Timestamps */}
          {renderSection(
            "Timestamps",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <DateTimeInput
                  label="Created At"
                  name="createdAt"
                  required
                  disabled
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                {companyData && (
                  <DateTimeInput
                    label="Updated At"
                    name="updatedAt"
                    disabled
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-2 ss:gap-6 justify-center sm:justify-end py-2 sm:py-4 pb-8 sm:pb-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex">
                <Button
                  text="Cancel"
                  hasBorder={true}
                  borderColor="#4D44B5"
                  onClick={handleCancel}
                  className="px-6 sm:px-12"
                />
              </div>
              <div className="flex">
                <Button
                  type="submit"
                  text={companyData ? "Update" : "Submit"}
                  hasBackground={true}
                  bgColor="#4D44B5"
                  className="text-white px-6 sm:px-12"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCompany;
