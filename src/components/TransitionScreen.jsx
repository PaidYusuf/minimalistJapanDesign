import { useState, useEffect, useCallback } from 'react'

const TransitionScreen = ({ onComplete, isLightModeTransition = false }) => {
  const [showQuote, setShowQuote] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  // Use useCallback to prevent unnecessary re-renders
  const handleComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    // Clear any existing timers to prevent conflicts
    let timers = []

    // Show the quote after a brief delay
    timers.push(setTimeout(() => setShowQuote(true), 300))
    
    // Start fade out after 5 seconds
    timers.push(setTimeout(() => setFadeOut(true), 5000))
    
    // Complete the transition after 6 seconds
    timers.push(setTimeout(() => handleComplete(), 6000))

    // Cleanup function to clear all timers
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [handleComplete]) // Only depend on handleComplete

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
