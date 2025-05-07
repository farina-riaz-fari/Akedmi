import React from "react";

const DeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl text-center w-[90%] sm:w-[450px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
        <h2 className="text-xl sm:text-2xl font-bold text-[#303972] mb-6">
          Are you sure you want to delete this partner?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            className="bg-white text-gray-700 rounded-full px-6 py-2 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#4D44B5] text-white rounded-full px-6 py-2 hover:bg-[#7C6DC1]"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
