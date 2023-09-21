import React, {useEffect, useState} from "react";
import AddSongModal from "./AddSongModal";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chords, setChords] = useState([]);
  const [apiData, setApiData] = useState(""); // Store HTML content here

  useEffect(() => {
    const savedSongs = localStorage.getItem("songList");

    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
    //Fetch data from Uberchord API and set it to apiData
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://api.uberchord.com/v1/embed/chords?nameLike=F"
    //     );
    //     const data = await response.text();
    //     setApiData(data);
    //   } catch (error) {
    //     console.error("Error fetching API data:", error);
    //   }
    // };
    //
    // fetchData();

  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addSong = (newSongText) => {
    if (newSongText.trim() !== "") {
      const updatedSongs = [...songs, newSongText];
      setSongs(updatedSongs);
      localStorage.setItem("songList", JSON.stringify(updatedSongs));
    }
  };

  const deleteSong = (index) => {
    const updatedSongs = songs.filter((_, i) => i !== index);
    setSongs(updatedSongs);
    localStorage.setItem("songList", JSON.stringify(updatedSongs));
  };


  return (
    <div className="container">
      <div className="box-border w-full h-full mx-auto p-8">
        <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span
              className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
              onClick={openModal}> Add Song
          </span>
        </button>
        <ul className="list-none p-0 mt-4">
          {songs.map((songName, index) => (
            <li key={index} className="justify-between items-center border-t border-gray-300 py-2">
              <div className="grid grid-cols-2 gap-4 p-2">
                <div>
                  <span className="text-lg font-semibold p-2">{songName}</span>
                </div>
                <button className="text-red-500 text-right hover:text-red-700"
                    onClick={() => deleteSong(index)}> Delete
                </button>


                {/*<div className="grid grid-cols-4 gap-4 col-span-2">*/}
                {/*  <ins className="scales_chords_api" chord="D#m(maj9)" ></ins>*/}
                {/*</div>*/}
      {/*          <script type="text/javascript" dangerouslySetInnerHTML={{*/}
      {/*  __html: '!function(e,r,d){var t,c=e.getElementsByTagName(r)[0];e.getElementById(d)||(t=e.createElement(r),t.id=d,t.src="//static.uberchord.com/uberchord-embed-sdk.js",c.parentNode.insertBefore(t,c))}(document,"script","uberchord-jssdk");'*/}
      {/*}}></script>*/}
      {/*          <div className="uberchord-chord" data-chord-name="c,,"></div>*/}

              </div>
            </li>
          ))}
          {/*<div data-autosize="1" className="uberchord-chord" data-chord-name="C,,"></div>*/}
        </ul>
        <AddSongModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAdd={addSong}
        />
      </div>
    </div>
  );
};

export default SongList;