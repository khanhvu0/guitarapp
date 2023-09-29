import React, { useState } from "react";

const DeleteChordModal = ({ isOpen, onClose, songChords, onDeleteChord}) => {
  const [chordToDelete, setChordToDelete] = useState("");
  const [error, setError] = useState("");

  const handleDeleteChord = () => {
    setError(""); // Clear any previous error messages
    if (songChords) {
      const chordIndex = songChords.indexOf(chordToDelete);
      if (chordIndex !== -1) {
        onDeleteChord(chordIndex);
        setChordToDelete("");
        setError("")
        onClose();
      } else {
        setError("Chord not found. Please try again.");
      }
    } else {
      setError("No chord found for song");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-1/2">
        <h2 className="text-lg lg:text-2xl font-semibold mb-2">Delete Chord</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md mb-2"
          placeholder="Enter chord to delete"
          value={chordToDelete}
          onChange={(e) => setChordToDelete(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-sm lg:text-lg text-white p-2 rounded-md hover:bg-red-600 mr-2"
            onClick={handleDeleteChord}
          >
            Delete
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
  ) : null;
};

export default DeleteChordModal;
