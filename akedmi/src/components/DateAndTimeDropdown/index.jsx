import React from "react";
import moment from "moment";

export function DateTimeInput({
  label,
  name,
  required = true,
  disabled = false,
  formData,
  setFormData,
  type = "datetime-local",
  error,
}) {
  const iso = formData[name];
  const formattedDateTime = iso
    ? moment(iso).local().format("YYYY-MM-DDTHH:mm")
    : "";

  const handleChange = (e) => {
    const isoString = moment(e.target.value).toISOString();
    setFormData((prev) => ({
      ...prev,
      [name]: isoString,
    }));
  };

  return (
    <div className="flex flex-col pb-6">
      <label className="text-[#303972] font-bold text-md sm:text-lg pb-4">
        {label}
        {required && " *"}
      </label>
      <div className="relative">
        <input
          name={name}
          type={type}
          className={`border border-[#C1BBEB] text-gray-700 text-md rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 block w-full py-3 px-4 ${
            disabled ? "bg-[#F3F4FF] opacity-70 cursor-not-allowed" : ""
          }`}
          value={formattedDateTime}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
