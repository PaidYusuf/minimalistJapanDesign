import { useState, useEffect } from 'react'

const TransitionScreen = ({ onComplete }) => {
  const [showQuote, setShowQuote] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show the quote after a brief delay
    const timer1 = setTimeout(() => setShowQuote(true), 500)
    
    // Start fade out after 4 seconds
    const timer2 = setTimeout(() => setFadeOut(true), 4000)
    
    // Complete the transition after 5 seconds
    const timer3 = setTimeout(() => onComplete(), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className={`transition-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="transition-content">
        {showQuote && (
          <div className="quote-container">
            <div className="japanese-quote">
              闇があるから光がある
            </div>
            <div className="english-quote">
              "Because there is darkness, there is light"
            </div>
            <div className="quote-attribution">
              - Japanese Philosophy
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransitionScreen
