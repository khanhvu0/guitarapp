import React, {useEffect, useState} from "react";
import AddSongModal from "./AddSongModal";
import AddChordModal from "./AddChordModal";
import DeleteChordModal from "./DeleteChordModal.jsx";
import "../styles/SongList.css"
import PremadeSongs from "./PremadeSongs.jsx";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [songChords, setSongChords] = useState(Array.from({ length: songs.length }, () => {}));
  const [isChordModalOpen, setIsChordModalOpen] = useState(false);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [editingNameIndex, setEditingNameIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [deleteChordIndex, setDeleteChordIndex] = useState(null);


  useEffect(() => {
    const savedSongs = localStorage.getItem("songList");
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }

    const savedSongChords = localStorage.getItem("songChords");
    if (savedSongChords) {
      setSongChords(JSON.parse(savedSongChords));
    }
  }, []);

  const openChordModal = (index) => {
    setSelectedSongIndex(index);
    setIsChordModalOpen(true);
  };

  const closeChordModal = () => {
    setIsChordModalOpen(false);
    setSelectedSongIndex(null);
  };

  const openSongModal = () => {
    setIsSongModalOpen(true);
  };

  const closeSongModal = () => {
    setIsSongModalOpen(false);
  };

  const handleEditClick = (index) => {
    setEditingNameIndex(index);
    setEditedName(songs[index]);
  };

  const handleInputChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSaveEnteredName = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const handleSaveClick = () => {
    if (editedName.trim() !== "") {
      const updatedSongs = [...songs];
      updatedSongs[editingNameIndex] = editedName;
      setSongs(updatedSongs);
      setEditingNameIndex(null);
      console.log(`Updated song name ${editedName}`)
      localStorage.setItem("songList", JSON.stringify(updatedSongs));
    }
  };

  const addSong = (newSongText) => {
    if (newSongText.trim() !== "") {
      const updatedSongs = [...songs, newSongText];
      setSongs(updatedSongs);
      setSongChords([...songChords, ""]);
      console.log(`Added song ${newSongText}`)
      localStorage.setItem("songList", JSON.stringify(updatedSongs));
    }
  };

  const deleteSong = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    const updatedChords = songChords.filter((_, i) => i !== index);
    setSongs(updatedSongs);
    setSongChords(updatedChords);
    console.log(`Deleted song`)
    localStorage.setItem("songList", JSON.stringify(updatedSongs));
    localStorage.setItem("songChords", JSON.stringify(updatedChords));
  };

  const addChord = (index, chordToAdd) => {
    const updatedChords = [...songChords];
    updatedChords[index] = [...updatedChords[index], chordToAdd];
    setSongChords(updatedChords);
    console.log(`Added chord ${chordToAdd}`)
    localStorage.setItem("songChords", JSON.stringify(updatedChords));
  };

  const openDeleteChordModal = (index, chord_index) => {
    setSelectedSongIndex(index);
    setDeleteChordIndex(chord_index);
  };

  const closeDeleteChordModal = () => {
    setDeleteChordIndex(null);
    setSelectedSongIndex(null)
  };

  const deleteChord = (chordIndex) => {
    const updatedChords = [...songChords];
    const updatedSongChords = updatedChords[selectedSongIndex];

    if (updatedSongChords && Array.isArray(updatedSongChords)) {
      updatedSongChords.splice(chordIndex, 1);
      updatedChords[selectedSongIndex] = updatedSongChords;

      setSongChords(updatedChords);
      closeDeleteChordModal();
      localStorage.setItem("songChords", JSON.stringify(updatedChords));
    }
  };


  return (
    <div className="container flex w-screen max-w-full">
      <div className="lg:basis-4/5">
        <div className="box-border w-full h-full mx-auto pl-6 pr-9 lg:pl-8 lg:pr-10">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 mt-2 overflow-hidden text-sm lg:text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span
              className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
              onClick={openSongModal}> Add Song
            </span>
          </button>
          <h3 className="text-xl lg:text-2xl font-semibold mt-4" >Your songs:</h3>

          <ul className="list-none mt-4">
            {songs.map((songName, index) => (
              <li key={index} className="justify-between items-center border-t border-gray-300 pb-3 pt-2">

                <div className="flex items-center pb-2 xl:pt-2">
                  {editingNameIndex === index ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={handleInputChange}
                      onKeyDown={handleSaveEnteredName}
                      autoFocus={true}
                      className="text-xl lg:text-2xl break-words break-all font-semibold p-2"
                    />
                  ) : (
                    <div className="text-xl lg:text-2xl break-words break-all font-semibold p-2">
                      {songName}
                    </div>
                  )}
                  {editingNameIndex === index ? null : (
                    <button
                      onClick={() => handleEditClick(index)}
                      className="inline-flex items-center justify-center w-4 h-8 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                    </button>
                  )}
                </div>

                {songChords[index] && Array.isArray(songChords[index]) && (
                  <div className="chords">
                    {songChords[index].map((chord, chordIndex) => (
                      <div key={chordIndex} className="chord-container">
                        <img
                          src={chord}
                          alt={`Chord ${chordIndex + 1} Image`}
                          className="chord-image"
                        />
                        <button
                          onClick={() => openDeleteChordModal(index, chordIndex)}
                          className="float-right focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="edit-buttons flex justify-end items-center mt-6">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs lg:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span
                      className="relative px-2.5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0" onClick={() => openChordModal(index)}>
                    Add Chord
                    </span>
                  </button>
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs lg:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-orange-400 to-red-500 group-hover:from-orange-400 group-hover:via-orange-400 group-hover:to-red-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span
                      className="relative px-2.5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0" onClick={() => deleteSong(index)}>
                    Delete Song
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <AddSongModal isOpen={isSongModalOpen} onClose={closeSongModal} onAdd={addSong} />
          <AddChordModal isOpen={isChordModalOpen} onClose={closeChordModal} onAddChord={addChord} selectedSongIndex={selectedSongIndex}/>
          <DeleteChordModal isOpen={deleteChordIndex !== null} onClose={closeDeleteChordModal} onConfirmDelete={() => deleteChord(deleteChordIndex)}/>
        </div>
      </div>

      <PremadeSongs songChords={songChords} setSongChords={setSongChords} addSong={addSong}/>
    </div>

  );
};

export default SongList;