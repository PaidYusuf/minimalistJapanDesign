import { useRef, useState } from 'react'
import './App.css'
import MouseFollower from './components/MouseFollower'
import Navigation from './components/Navigation'
import MainSection from './components/MainSection'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import TransitionScreen from './components/TransitionScreen'
import MouseToButtonPath from './components/MouseToButtonPath'

function App() {
  const mainRef = useRef(null)
  const aboutRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)
  
  const [showTransition, setShowTransition] = useState(false)
  const [showFullPortfolio, setShowFullPortfolio] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false) // Start in light appearance (no CSS class)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isLightModeTransition, setIsLightModeTransition] = useState(false)

  const handleTransition = () => {
    setShowTransition(true)
    setIsLightModeTransition(false)
    setIsLightMode(true) // Change to dark appearance immediately
    setShowFullPortfolio(true) // Show portfolio immediately
  }

  const completeTransition = () => {
    setShowTransition(false)
    // All changes already happened in handleTransition
  }

  const handleLightModeTransition = () => {
    setShowTransition(true)
    setIsLightModeTransition(true)
    setIsLightMode(false) // Change to light appearance immediately
    setShowFullPortfolio(false) // Hide portfolio and return to main section immediately
  }

  const completeLightModeTransition = () => {
    setShowTransition(false)
    // All changes already happened in handleLightModeTransition
  }

  return (
    <div className={`app ${isLightMode ? 'light-mode' : ''}`}>
      <MouseFollower isLightMode={isLightMode} />
      <MouseToButtonPath 
        isVisible={!showFullPortfolio} 
        buttonPosition={buttonPosition}
        isLightMode={isLightMode}
      />
      
      <Navigation 
        mainRef={mainRef}
        aboutRef={aboutRef}
        portfolioRef={portfolioRef}
        contactRef={contactRef}
        showFullPortfolio={showFullPortfolio}
      />

      <main className="main-container">
        <MainSection 
          ref={mainRef} 
          onTransition={handleTransition}
          onButtonPositionChange={setButtonPosition}
          showButton={!showFullPortfolio}
        />
        
        {showFullPortfolio && (
          <>
            <AboutSection ref={aboutRef} />
            <PortfolioSection ref={portfolioRef} />
            <ContactSection 
              ref={contactRef} 
              onLightModeTransition={handleLightModeTransition}
              onButtonPositionChange={setButtonPosition}
            />
          </>
        )}
      </main>

      {showTransition && (
        <TransitionScreen 
          onComplete={isLightModeTransition ? completeLightModeTransition : completeTransition}
          isLightModeTransition={isLightModeTransition}
        />
      )}
    </div>
  )
}

export default App
