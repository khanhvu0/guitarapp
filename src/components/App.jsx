import React from 'react'
import SongList from "./SongList.jsx";
import Title from "./Title";
import '../styles/App.css'

function App() {

  return (
    <>
        <div className="grid gap-4">
            <Title text="Guitar Chord Book" />
            <SongList />
        </div>
    </>
  )
}

export default App
