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
                  "With every gentle touch, beauty awakens in the quiet corners of the world. Through creativity, we breathe life into dreams and illuminate the ordinary with meaning."
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
                  "Within every shadow, a story waits to be revealed; within every light, wisdom quietly grows. We are the weavers of meaning, shaping purpose from the dance of seen and unseen."
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
