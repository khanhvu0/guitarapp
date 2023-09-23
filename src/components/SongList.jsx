import React, {useEffect, useState} from "react";
import AddSongModal from "./AddSongModal";
import AddChordModal from "./AddChordModal";
import DeleteChordModal from "./DeleteChordModal.jsx";
import "../styles/SongList.css"

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [songChords, setSongChords] = useState(Array.from({ length: songs.length }, () => []));
  const [isChordModalOpen, setIsChordModalOpen] = useState(false);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [isDeleteChordModalOpen, setIsDeleteChordModalOpen] = useState(false); // State for the Delete Chord modal


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


  const openDeleteChordModal = (index) => {
    setSelectedSongIndex(index)
    setIsDeleteChordModalOpen(true);
  };

  const closeDeleteChordModal = () => {
    setIsDeleteChordModalOpen(false);
    setSelectedSongIndex(null);
  };

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

  const addSong = (newSongText) => {
    if (newSongText.trim() !== "") {
      const updatedSongs = [...songs, newSongText];
      setSongs(updatedSongs);
      setSongChords([...songChords, ""]);
      localStorage.setItem("songList", JSON.stringify(updatedSongs));
    }
  };

  const deleteSong = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    const updatedChords = songChords.filter((_, i) => i !== index);
    setSongs(updatedSongs);
    setSongChords(updatedChords);
    localStorage.setItem("songList", JSON.stringify(updatedSongs));
    localStorage.setItem("songChords", JSON.stringify(updatedChords));
    window.location.reload();
  };

  const addChord = (index, chord) => {
    const updatedChords = [...songChords];
    updatedChords[index] = [...updatedChords[index], chord];
    setSongChords(updatedChords);
    localStorage.setItem("songChords", JSON.stringify(updatedChords));
  };

  const deleteChord = (chordIndex) => {
    const updatedChords = songChords[selectedSongIndex];
    const chordToDelete = updatedChords[chordIndex];
    updatedChords.splice(updatedChords.indexOf(chordToDelete), 1);
    setSongChords((prevSongChords) => {
      const newSongChords = [...prevSongChords];
      newSongChords[selectedSongIndex] = updatedChords;
      return newSongChords;
    });
    localStorage.setItem("songChords", JSON.stringify(updatedChords));
    // BUG: deleting chord that was not added right before not work
  };

  return (
    <div className="container">
      <div className="box-border w-full h-full mx-auto p-8">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span
            className="relative text-lg px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
            onClick={openSongModal}> Add Song
          </span>
        </button>
        {/*<h3>Your songs:</h3>*/}
        <ul className="list-none mt-4">
          {songs.map((songName, index) => (
            <li key={index} className="justify-between items-center border-t border-gray-300 pb-8 pt-2">
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <span className="text-2xl font-semibold p-2">{songName}</span>
                </div>

                <div className="flex justify-end items-center">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span
                      className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0" onClick={() => openChordModal(index)}>
                    Add Chord
                    </span>
                  </button>
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span
                      className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0" onClick={() => openDeleteChordModal(index)}>
                    Delete Chord
                    </span>
                  </button>
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-orange-400 to-red-500 group-hover:from-orange-400 group-hover:via-orange-400 group-hover:to-red-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span
                      className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0" onClick={() => deleteSong(index)}>
                    Delete Song
                    </span>
                  </button>
                </div>

              </div>
              {songChords[index] && Array.isArray(songChords[index]) &&
                <div className="chord-images">
                        {songChords[index].map((chord, chordIndex) => (
                          <div key={chordIndex} className="chord-image" dangerouslySetInnerHTML={{ __html: `<ins class="scales_chords_api" chord="${chord}"></ins>` }}></div>
                        ))}
                </div>
              }
            </li>
          ))}
        </ul>
        <AddSongModal isOpen={isSongModalOpen} onClose={closeSongModal} onAdd={addSong} />
        <AddChordModal isOpen={isChordModalOpen} onClose={closeChordModal} onAddChord={addChord} selectedSongIndex={selectedSongIndex}/>
        <DeleteChordModal isOpen={isDeleteChordModalOpen} onClose={closeDeleteChordModal} songChords={songChords[selectedSongIndex]} onDeleteChord={deleteChord}
      />
      </div>
    </div>
  );
};

export default SongList;