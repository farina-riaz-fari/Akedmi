import { FiSearch } from "react-icons/fi";
import React from "react";

const Searchbar = ({ value, onChange }) => {
  return (
    <form>
      <div className="relative shadow-md rounded-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none bg-white rounded-l-full">
          <FiSearch className="text-[24px] text-[#4D44B5]" />
        </div>
        <input
          type="search"
          className="block w-full px-4 p-2.5 pl-14 text-md text-gray-900 border border-gray-100 rounded-full bg-white placeholder-text-md focus:outline-none focus:ring-2 focus:ring-[#4D44B5] focus:border-none"
          placeholder="Search Here..."
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default Searchbar;
