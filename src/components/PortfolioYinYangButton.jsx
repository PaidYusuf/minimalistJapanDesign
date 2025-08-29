import { useEffect, useRef } from 'react'

const PortfolioYinYangButton = ({ onClick, onPositionChange }) => {
  const buttonRef = useRef()

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current && onPositionChange) {
        const rect = buttonRef.current.getBoundingClientRect()
        onPositionChange({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
    }

    updatePosition()
    
    // Update position on scroll and resize
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)
    
    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [onPositionChange])

  return (
    <div className="portfolio-yin-yang-container">
      <button ref={buttonRef} className="portfolio-yin-yang-button" onClick={onClick}>
        <div className="yin-yang">
          <div className="yang"></div>
          <div className="yin"></div>
          <div className="dot-yang"></div>
          <div className="dot-yin"></div>
        </div>
      </button>
  <p className="portfolio-button-hint">Uncover the brilliance that lies quietly within</p>
    </div>
  )
}

export default PortfolioYinYangButton
