import React, { useState } from "react";

const AddChordModal = ({ isOpen, onClose, onAddChord, selectedSongIndex }) => {
  const [chordInput, setChordInput] = useState("");
  const [chordImages, setChordImages] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);
  const [variation, setVariation] = useState("");

  const handleChordTextChange = (e) => {
    setChordInput(e.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setSelectedChord(null);
    try {
      if (chordInput.trim() !== "") {
        const formattedInput = chordInput.replace("#", "%23")
        const response = await fetch(`https://guitarapp-backend.onrender.com/?chord_name=${formattedInput}`);
        if(!response.ok) {
          setVariation("No chord found for " + chordInput[0].toUpperCase() + chordInput.slice(1).toLowerCase())
          setChordImages(null);
        }
        else {
          const data = await response.json();
          setVariation("Select a variation for " + chordInput[0].toUpperCase() + chordInput.slice(1).toLowerCase() + ":")
          setChordImages(data.images);
        }
      }
    } catch (error) {
      console.error('Error fetching chord images:', error);
    }
  };

  const handleAddChord = () => {
    if (selectedChord && selectedSongIndex !== null) {
      onAddChord(selectedSongIndex, selectedChord.link);
      setChordInput("");
      setChordImages(null);
      setSelectedChord(null);
      setVariation(null);
      onClose();
    }
  };

  const cancelAddChord = () => {
    setChordInput("");
    setChordImages(null);
    setSelectedChord(null);
    setVariation(null);
    onClose();
  }

  const handleClickChord = (chord) => {
    setSelectedChord(chord);
  };


  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-3/4 lg:w-1/2">
        <h2 className="text-lg lg:text-2xl font-semibold mb-2">Add Chord</h2>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div
                className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search"
                   className="border w-full p-4 ps-10 rounded-lg border-gray-300 "
                   placeholder="Enter chord name (Ex: Cmaj7)" required
                   value={chordInput}
                   onChange={handleChordTextChange}
            />
              <button type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onSubmit={handleSearch}
              >Search
              </button>
          </div>
        </form>

        <h2 className="text-lg lg:text-lg font-semibold mb-2">{variation}</h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {chordImages && chordImages.map((chord, index) => (
            <button
              key={index}
              onClick={() => handleClickChord(chord)}
              className={`relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group hover:opacity-80 transition-opacity duration-300 ${
                selectedChord && selectedChord.link === chord.link ? 'opacity-80' : ''
              }`}
            >
              <img
                src={chord.link}
                alt={`Chord ${chordInput} Image ${index + 1}`}
                className="mb-2 rounded-md"
              />
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className={`bg-blue-500 text-sm lg:text-lg text-white p-2 rounded-md hover:bg-blue-600 mr-2 ${
              selectedChord ? '' : 'cursor-not-allowed opacity-50'
            }`}
            onClick={handleAddChord}
            disabled={!selectedChord}
          >
            Add
          </button>
          <button
            className="bg-gray-300 text-sm lg:text-lg text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={cancelAddChord}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddChordModal;
