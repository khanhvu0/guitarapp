import React from 'react'
import SongList from "./SongList.jsx";
import Title from "./Title";
import '../styles/App.css'

function App() {

  return (
    <>
        <div className="w-screen">
            <Title text="Guitar Chord Book" />
            <SongList />
        </div>
    </>
  )
}

export default App
