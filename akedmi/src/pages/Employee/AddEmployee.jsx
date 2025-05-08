import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import { EmployeeContext } from "../../store/EmployeeContext";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "../../components/Input";
import { FormSelect } from "../../components/Select";
import { DateTimeInput } from "../../components/DateAndTimeDropdown";
import Button from "../../components/Button";
import { CompanyContext } from "../../store/CompanyContext";
import { useNavigate, useLocation } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addEmployee, updateEmployee } = useContext(EmployeeContext);
  const { companies } = useContext(CompanyContext);
  const employeeData = location.state?.employee;
  const returnPath = location.state?.returnPath;
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    id: employeeData?.id || uuidv4(),
    employee_code: employeeData?.employee_code || "",
    first_name: employeeData?.first_name || "",
    last_name: employeeData?.last_name || "",
    address: employeeData?.address || "",
    national_id: employeeData?.national_id || "",
    passport_number: employeeData?.passport_number || "",
    gender: employeeData?.gender || "",
    email: employeeData?.email || "",
    phone_number: employeeData?.phone_number || "",
    profileImage: employeeData?.profileImage || "",

    job_title: employeeData?.job_title || "",
    department_id: employeeData?.department_id || "",
    employment_type: employeeData?.employment_type || "",
    hire_date: employeeData?.hire_date || "",
    termination_date: employeeData?.termination_date || "",
    status: employeeData?.status || "",
    company: employeeData?.company || "",
    role: employeeData?.role || "",

    salary: employeeData?.salary || "",
    bank_account_number: employeeData?.bank_account_number || "",
    bank_name: employeeData?.bank_name || "",
    tax_identification_number: employeeData?.tax_identification_number || "",
    is_tax_exempt: employeeData?.is_tax_exempt || "",
    payment_method: employeeData?.payment_method || "",

    created_at: employeeData?.created_at || new Date().toISOString(),
    updated_at: employeeData?.updated_at || "",
  });

  const requiredFields = [
    "employee_code",
    "email",
    "first_name",
    "last_name",
    "job_title",
    "employment_type",
    "hire_date",
    "status",
    "company",
    "salary",
    "is_tax_exempt",
    "payment_method",
    "gender",
    "phone_number",
    "role",
  ];

  const fieldLabels = {
    employee_code: "Employee Code",
    first_name: "First Name",
    last_name: "Last Name",
    job_title: "Job Title",
    employment_type: "Employment Type",
    hire_date: "Hire Date",
    status: "Status",
    salary: "Salary",
    is_tax_exempt: "Tax Exempt",
    payment_method: "Payment Method",
    company: "Company",
    email: "Email",
    gender: "Gender",
    phone_number: "Phone Number",
    role: "Role",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.status) {
      formData.status = "Active";
    }
    if (!formData.is_tax_exempt) {
      formData.is_tax_exempt = "true";
    }

    let newFormErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const label = fieldLabels[field] || field;
        newFormErrors[field] = `${label} is required.`;
      }
    });

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);

      const firstErrorField = Object.keys(newFormErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        element.focus();
      }

      return;
    }

    setFormErrors({});
    if (employeeData) {
      updateEmployee({ ...formData, updated_at: new Date().toISOString() });
    } else {
      addEmployee(formData);
    }
    navigate(returnPath || "/employee");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(returnPath || "/employee");
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
    <div className="flex w-full bg-[#F3F4FF]">
      <div className="flex-1 bg-[#F3F4FF] pt-8 px-4 md:px-6 lg:px-8 xl:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 lg:mt-0 mb-6">
          <Navbar
            title={employeeData ? "Edit Employee Data" : "Add New Employee"}
          />
          <ProfileGroup gap="gap-10" />
        </div>

        <form onSubmit={handleSubmit} className="overflow-x-auto">
          {renderSection(
            "Basic Information",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Employee Code"
                  name="employee_code"
                  type="text"
                  required
                  disabled={!!employeeData}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.employee_code}
                />
                <FormInput
                  label="First Name"
                  name="first_name"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.first_name}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="text"
                  required
                  disabled={!!employeeData}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.email}
                />
                <FormInput
                  label="Phone Number"
                  name="phone_number"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.phone_number}
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
                  label="National ID"
                  name="national_id"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormInput
                  label="Last Name"
                  name="last_name"
                  type="text"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.last_name}
                />
                <FormSelect
                  label="Gender"
                  name="gender"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.gender}
                />
                <FormInput
                  label="Passport Number"
                  name="passport_number"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <div className="flex flex-col pb-6">
                  <span className="text-[#303972] font-bold text-md sm:text-lg pb-4">
                    Profile Image
                  </span>
                  <label className="relative w-40 h-40 border-2 border-dashed border-[#C1BBEB] flex items-center justify-center cursor-pointer ">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
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
              </div>
            </>
          )}

          {renderSection(
            "Job & Employment Details",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormSelect
                  label="Job Title"
                  name="job_title"
                  options={[
                    {
                      value: "Frontend Developer",
                      label: "Frontend Developer",
                    },
                    { value: "Backend Developer", label: "Backend Developer" },
                    {
                      value: "Full Stack Developer",
                      label: "Full Stack Developer",
                    },
                    {
                      value: "Graphics Designer",
                      label: "Graphics Designer",
                    },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.job_title}
                />
                <FormSelect
                  label="Department"
                  name="department_id"
                  options={[
                    { value: "HR", label: "HR" },
                    { value: "Marketing", label: "Marketing" },
                    { value: "Engineering", label: "Engineering" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.department_id}
                />
                <FormSelect
                  label="Employment Type"
                  name="employment_type"
                  options={[
                    { value: "Full-Time", label: "Full-Time" },
                    { value: "Part-Time", label: "Part-Time" },
                    { value: "Contract", label: "Contract" },
                    { value: "Intern", label: "Intern" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.employment_type}
                />
                <FormSelect
                  label="Company"
                  name="company"
                  options={companies.map((c) => ({
                    value: c.companyName,
                    label: c.companyName,
                  }))}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.company}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <DateTimeInput
                  label="Hire Date"
                  name="hire_date"
                  required
                  formData={formData}
                  setFormData={setFormData}
                  error={formErrors.hire_date}
                />
                <DateTimeInput
                  label="Termination Date"
                  name="termination_date"
                  required={false}
                  formData={formData}
                  setFormData={setFormData}
                />
                <FormSelect
                  label="Status"
                  name="status"
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Resigned", label: "Resigned" },
                    { value: "Terminated", label: "Terminated" },
                    { value: "On Leave", label: "On Leave" },
                  ]}
                  includeDefaultOption={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormSelect
                  label="Role"
                  name="role"
                  options={[
                    { value: "Manager", label: "Manager" },
                    { value: "Employee", label: "Employee" },
                    { value: "Director", label: "Director" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.role}
                />
              </div>
            </>
          )}

          {renderSection(
            "Salary & Payroll Details",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Salary"
                  name="salary"
                  type="number"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.salary}
                />
                <FormInput
                  label="Bank Account Number"
                  name="bank_account_number"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormInput
                  label="Tax ID"
                  name="tax_identification_number"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <FormInput
                  label="Bank Name"
                  name="bank_name"
                  type="text"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormSelect
                  label="Is Tax Exempt"
                  name="is_tax_exempt"
                  options={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" },
                  ]}
                  includeDefaultOption={false}
                  formData={formData}
                  handleChange={handleChange}
                />
                <FormSelect
                  label="Payment Method"
                  name="payment_method"
                  options={[
                    { value: "Bank Transfer", label: "Bank Transfer" },
                    { value: "Cash", label: "Cash" },
                    { value: "Check", label: "Check" },
                  ]}
                  formData={formData}
                  handleChange={handleChange}
                  error={formErrors.payment_method}
                />
              </div>
            </>
          )}

          {renderSection(
            "Timestamps",
            <>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                <DateTimeInput
                  label="Created At"
                  name="created_at"
                  required
                  disabled
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="ss:w-full basis-[50%] px-1 sm:px-6">
                {employeeData && (
                  <DateTimeInput
                    label="Updated At"
                    name="updated_at"
                    disabled
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </>
          )}

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
                  text={employeeData ? "Update" : "Submit"}
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

export default AddEmployee;
