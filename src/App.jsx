import { useRef, useState } from 'react'
import './App.css'
import MouseFollower from './components/MouseFollower'
import Navigation from './components/Navigation'
import MainSection from './components/MainSection'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import TransitionScreen from './components/TransitionScreen'

function App() {
  const mainRef = useRef(null)
  const aboutRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)
  
  const [showTransition, setShowTransition] = useState(false)
  const [showFullPortfolio, setShowFullPortfolio] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  const handleTransition = () => {
    setShowTransition(true)
    setIsLightMode(true)
  }

  const completeTransition = () => {
    setShowTransition(false)
    setShowFullPortfolio(true)
  }

  return (
    <div className={`app ${isLightMode ? 'light-mode' : ''}`}>
      <MouseFollower isLightMode={isLightMode} />
      
      <Navigation 
        mainRef={mainRef}
        aboutRef={aboutRef}
        portfolioRef={portfolioRef}
        contactRef={contactRef}
        showFullPortfolio={showFullPortfolio}
      />

      <main className="main-container">
        <MainSection ref={mainRef} />
        <AboutSection ref={aboutRef} onTransition={handleTransition} />
        
        {showFullPortfolio && (
          <>
            <PortfolioSection ref={portfolioRef} />
            <ContactSection ref={contactRef} />
          </>
        )}
      </main>

      {showTransition && (
        <TransitionScreen onComplete={completeTransition} />
      )}
    </div>
  )
}

export default App
