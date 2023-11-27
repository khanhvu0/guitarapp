import React from "react";

const DeleteChordModal = ({ isOpen, onClose, onConfirmDelete }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md shadow-md w-3/4 lg:w-1/2">
          <h2 className="text-lg lg:text-2xl font-semibold mb-2">Confirm Delete</h2>
          <p className="text-m mb-4">Are you sure you want to delete this chord?</p>
          <div className="flex justify-end mt-2">
            <button
              className="bg-red-500 text-sm lg:text-lg text-white p-2 rounded-md hover:bg-red-600 mr-2"
              onClick={() => {
                onConfirmDelete();
                onClose();
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 text-sm lg:text-lg text-gray-700 p-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteChordModal;
