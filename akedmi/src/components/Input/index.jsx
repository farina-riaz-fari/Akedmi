import React from "react";

export const FormInput = ({
  label,
  name,
  type = "text",
  required = true,
  disabled = false,
  formData,
  handleChange,
  error,
}) => {
  return (
    <div className="flex flex-col pb-6">
      <label className="text-[#303972] font-bold text-md sm:text-lg pb-4">
        {label}
        {required && " *"}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          className="block w-full p-2.5 text-sm border border-[#C1BBEB] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={`Enter ${label}`}
          value={formData[name]}
          onChange={handleChange}
          disabled={disabled}
        />
      ) : (
        <input
          name={name}
          type={type}
          className={`border border-[#C1BBEB] rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            disabled ? "bg-[#F3F4FF] opacity-70 cursor-not-allowed" : ""
          }`}
          placeholder={`Enter ${label}`}
          value={formData[name]}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};
