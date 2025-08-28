import { useState, useEffect } from 'react'

const TransitionScreen = ({ onComplete }) => {
  const [showQuote, setShowQuote] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show the quote after a brief delay
    const timer1 = setTimeout(() => setShowQuote(true), 800)
    
    // Start fade out after 6 seconds to give more time to read
    const timer2 = setTimeout(() => setFadeOut(true), 6000)
    
    // Complete the transition after 7 seconds
    const timer3 = setTimeout(() => onComplete(), 7000)

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
              光と影が織りなす物語
            </div>
            <div className="english-quote">
              "In every shadow lies a story waiting to be illuminated, and in every light dwells wisdom earned through darkness. We are the architects of meaning, weaving purpose from the eternal dance between what is seen and unseen."
            </div>
            <div className="quote-attribution">
              - Philosophy of Balance
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransitionScreen
