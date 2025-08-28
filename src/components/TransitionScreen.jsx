import { useState, useEffect } from 'react'

const TransitionScreen = ({ onComplete, isLightModeTransition = false }) => {
  const [showQuote, setShowQuote] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show the quote after a brief delay (reduced from 0.8s to 0.3s)
    const timer1 = setTimeout(() => setShowQuote(true), 300)
    
    // Start fade out after 5 seconds
    const timer2 = setTimeout(() => setFadeOut(true), 5000)
    
    // Complete the transition after 6 seconds
    const timer3 = setTimeout(() => onComplete(), 6000)

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
            {isLightModeTransition ? (
              <>
                <div className="japanese-quote">
                  人間の創造力が美しい詳細を作る
                </div>
                <div className="english-quote">
                  "The human touch weaves beauty into every detail, transforming the ordinary into extraordinary. Through creativity and craftsmanship, we breathe life into our visions and illuminate the world with purpose and meaning."
                </div>
                <div className="quote-attribution">
                  - The Art of Human Creation
                </div>
              </>
            ) : (
              <>
                <div className="japanese-quote">
                  光と影が織りなす物語
                </div>
                <div className="english-quote">
                  "In every shadow lies a story waiting to be illuminated, and in every light dwells wisdom earned through darkness. We are the architects of meaning, weaving purpose from the eternal dance between what is seen and unseen."
                </div>
                <div className="quote-attribution">
                  - Philosophy of Balance
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TransitionScreen
