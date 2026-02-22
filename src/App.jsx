import { useState } from 'react'
import harryPotterTheme from './assets/harry_potter_theme.mp3'
import background from './assets/minecraftHogwarts.png'
import NewPage from './NewPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
    <audio
        src={harryPotterTheme}
        autoPlay
        loop
        hidden
      />

      {currentPage === 'home' ? (
        <>
          <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: -1, margin: 0, padding: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100vw', position: 'relative', zIndex: 1 }}>
            <h1 style={{ color: 'white' }}>Sleepy Hallows</h1>
            <div className="card">
              <button onClick={() => setCurrentPage('newpage')}>
                Enter the Chamber of Rest
              </button>
            </div>
          </div>
        </>
      ) : (
        <NewPage onBack={() => setCurrentPage('home')} />
      )}
    </>
  )
}

export default App
