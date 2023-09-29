import React, {useEffect, useState} from "react";

const AddSongModal = ({ isOpen, onClose, onAdd }) => {
  const [newSongText, setNewSongText] = useState("");

  const handleTextChange = (e) => {
    setNewSongText(e.target.value);
  };

  const handleAddSong = () => {
    if (newSongText.trim() !== "") {
      onAdd(newSongText);
      setNewSongText("");
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-1/2">
        <h2 className="text-lg lg:text-2xl font-semibold mb-2">Add New Song</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md mb-2"
          placeholder="Enter song name"
          value={newSongText}
          onChange={handleTextChange}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-sm lg:text-lg text-white p-2 rounded-md hover:bg-blue-600 mr-2"
            onClick={handleAddSong}> Add
          </button>
          <button
            className="bg-gray-300 text-sm lg:text-lg text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={onClose}> Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddSongModal;
