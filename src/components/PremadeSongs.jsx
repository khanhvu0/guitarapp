import React, { useState } from "react";

const PremadeSongs = ({ songChords, setSongChords, addSong }) => {
  const premadeSongs = [
    {
      name: "Creep - Radiohead",
      chords: [
        "https://www.scales-chords.com/chord-charts/guitar-G-g-n-l-h-3-5-5-4-3-3.jpg",
        "https://www.scales-chords.com/chord-charts/guitar-B-b-n-l-h-7-9-9-8-7-7.jpg",
        "https://www.scales-chords.com/chord-charts/guitar-C-c-n-l-h-8-10-10-9-8-8.jpg",
        "https://www.scales-chords.com/chord-charts/guitar-Cm-c-n-l-h-8-10-10-8-8-8.jpg",
      ],
    },
    {
      name: "From The Start - Laufey",
      chords: [
        "https://www.scales-chords.com/chord-charts/guitar-Dsm9-d-sharp-l-h-11-13-11-11-11-13.jpg",
        "https://www.scales-chords.com/chord-charts/guitar-Ab13-a-flat-l-h-4-4-4-5-6-4.jpg",
        "https://www.scales-chords.com/chord-charts/guitar-Csmaj7-c-sharp-l-h-x-4-6-5-6-4.jpg",
      ],
    },
    {
      name: "Love - Keyshia Cole",
      chords: [
          "https://www.scales-chords.com/chord-charts/guitar-Fsmaj7-f-sharp-l-h-x-9-11-10-11-9.jpg",
          "https://www.scales-chords.com/chord-charts/guitar-Fs7-f-sharp-l-h-x-9-11-9-11-9.jpg",
          "https://www.scales-chords.com/chord-charts/guitar-Bmaj7-b-n-l-h-7-9-8-8-7-7.jpg",
          "https://www.scales-chords.com/chord-charts/guitar-D-d-n-l-h-10-12-12-11-10-10.jpg"
      ],
    },
    {
      name: "Seasons - Wave to Earth",
      chords: [
          "https://www.scales-chords.com/chord-charts/guitar-Dmaj7-d-n-l-h-x-5-7-6-7-5.jpg",
          "https://www.scales-chords.com/chord-charts/guitar-D7-d-n-l-h-x-5-7-5-7-5.jpg",
          "https://www.scales-chords.com/chord-charts/guitar-Gmaj7-g-n-l-h-3-5-4-4-3-3.jpg",
          "https://www.scales-chords.com/chord-charts/guitar-Gm6-g-n-l-h-3-x-0-3-3-0.jpg"
      ]
    }
  ];

  const addPremadeChords = (index, chords) => {
    const updatedChords = [...songChords];
    updatedChords[index] = [...updatedChords[index], ...chords];
    setSongChords(updatedChords);
    localStorage.setItem("songChords", JSON.stringify(updatedChords));
  };

  return (
    <div className="hidden lg:block float-right basis-1/5 min-w-fit flex justify-center">
      <div className="min-w-fit lg:p-4 xl:p-6 -mt-16 mr-5 lg:ml-4 h-fit border-2 rounded-2xl">
        <h1 className="mb-5 flex justify-center items-center text-xl font-medium">Premade Songs</h1>
        <ul>
          {premadeSongs.map((song, index) => (
            <li key={index} className="w-full px-2 py-4 pl-1 border-t border-gray-400">
              <div className="text-lg">{song.name}</div>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 mt-2 overflow-hidden text-sm font-normal text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-green-300 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span
                  className="relative px-1.5 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
                  onClickCapture={() => addSong(song.name)}
                  onClick={() => addPremadeChords(songChords.length - 1, song.chords)}
                >
                  Add Song
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PremadeSongs;
