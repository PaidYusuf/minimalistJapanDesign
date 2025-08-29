import { useRef, useState, useEffect } from 'react'
import './App.css'
import MouseFollower from './components/MouseFollower'
import Navigation from './components/Navigation'
import MainSection from './components/MainSection'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import TransitionScreen from './components/TransitionScreen'
import MouseToButtonPath from './components/MouseToButtonPath'
import PortfolioHoverImage from './components/PortfolioHoverImage'

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

  // Prevent scrolling when transition screen is active
  useEffect(() => {
    if (showTransition) {
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Restore scrolling and position
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [showTransition])

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
      <PortfolioHoverImage showFullPortfolio={showFullPortfolio} />
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
          isLightMode={isLightMode}
          showFullPortfolio={showFullPortfolio}
          aboutRef={aboutRef}
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
