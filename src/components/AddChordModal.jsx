import React, { useState } from "react";

const AddChordModal = ({ isOpen, onClose, onAddChord, selectedSongIndex }) => {
  const [chordInput, setChordInput] = useState("");

  const handleChordTextChange = (e) => {
    setChordInput(e.target.value);
  };

  const handleAddChord = () => {
    if (chordInput.trim() !== "" && selectedSongIndex !== null) {
      onAddChord(selectedSongIndex, chordInput.toLowerCase());
      setChordInput("");
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-3/4 lg:w-1/2">
        <h2 className="text-lg lg:text-2xl font-semibold mb-2">Add Chord</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md mb-2"
          placeholder="Enter chord name (Ex: Cmaj7)"
          value={chordInput}
          onChange={handleChordTextChange}
        />
        <div className="flex justify-end mt-2">
          <button type="submit"
            className="bg-blue-500 text-sm lg:text-lg text-white p-2 rounded-md hover:bg-blue-600 mr-2"
            onClick={handleAddChord}
          >
            Add
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

export default AddChordModal;
