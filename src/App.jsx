import { useState } from 'react'
import harryPotterTheme from './assets/harry_potter_theme.mp3'
import background from './assets/Harry_Potter_Back.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <audio
        src={harryPotterTheme}
        autoPlay
        loop
        hidden
      />

      <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: -1, margin: 0, padding: 0 }} />
      <h1>Sleepy Hallows</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
