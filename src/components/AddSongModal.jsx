import React, {useEffect, useState} from "react";

const AddSongModal = ({ isOpen, onClose, onAdd }) => {
  const [newSongText, setNewSongText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("apiData");

    if (storedData) {
      setApiData(JSON.parse(storedData));
    }

  }, []);

  const handleChordSearch = async () => {
    if (searchInput.trim() !== "") {
      try {
        const response = await fetch(`https://api.uberchord.com/v1/embed/chords/${searchInput}`);
        const data = await response.text();
        console.log("Search response:", data)

        setApiData(data);
        setSearchInput("");
        localStorage.setItem("apiData", JSON.stringify(data));

      } catch (error) {
        console.error("Error fetching API data:", error);
        setApiData(null);
      }
    }
  };

  const handleTextChange = (e) => {
    setNewSongText(e.target.value);
  };

  const handleAddSong = () => {
    if (newSongText.trim() !== "") {
      onAdd(newSongText);
      setNewSongText("");
      setApiData(null);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-1/2">
        <h2 className="text-2xl font-semibold mb-4 p-1">Add New Song</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md mb-2"
          placeholder="Enter song name"
          value={newSongText}
          onChange={handleTextChange}
        />
        <h5 className="text-m font-semibold mt-4 mb-4"> - Add Chord Progression</h5>

        <form>
          <label htmlFor="default-search"
                 className="mb-2 text-sm font-medium sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search"
                   className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                   placeholder="Ex. 'D#m(maj9)'"
                   value={searchInput}
                   onChange={(e) => setSearchInput(e.target.value)}
                   required/>
            <button type="button" onClick={handleChordSearch}
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              > Search progression
            </button>
          </div>
          {/*<div dangerouslySetInnerHTML={{__html: apiData}}></div>*/}
        </form>



        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2"
            onClick={handleAddSong}> Add
          </button>
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            onClick={onClose}> Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddSongModal;
