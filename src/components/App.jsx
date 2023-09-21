import { useState } from 'react'
import SongList from "./SongList.jsx";
import Title from "./Title";
import '../styles/App.css'

function App() {

  return (
    <>
        <div className="grid gap-4">
            <Title text="Chord Progressions" />
            <SongList />
        </div>
    </>
  )
}

export default App
