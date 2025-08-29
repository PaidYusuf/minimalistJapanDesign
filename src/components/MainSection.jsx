import { forwardRef } from 'react'
import YinYangButton from './YinYangButton'

const MainSection = forwardRef(({ 
  onTransition, 
  onButtonPositionChange, 
  showButton = true, 
  isLightMode = false, 
  showFullPortfolio = false, 
  aboutRef 
}, ref) => {
  
  const scrollToAbout = () => {
    if (aboutRef && aboutRef.current) {
      aboutRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section ref={ref} className="section main-section">
      <div className="blur-shape main-blur"></div>
      <div className="main-content">
        <div className="name-section">
          <h1 className="main-title">YUSUF</h1>
          <p className="subtitle">Computer Engineering Student</p>
          <p className="description">3rd Year • Innovation Driven • Tech Enthusiast</p>
        </div>
        <div className="vertical-text-left">
          <span>ポートフォリオ</span>
        </div>
        <div className="accent-dot"></div>
      </div>
      
      {/* Scroll down button - only show in dark mode when full portfolio is visible */}
      {isLightMode && showFullPortfolio && (
        <div className="scroll-down-button" onClick={scrollToAbout}>
          <div className="scroll-icon">
            <div className="scroll-arrow"></div>
            <div className="scroll-arrow"></div>
          </div>
          <span className="scroll-text">Scroll to find light again</span>
        </div>
      )}
      
      {showButton && (
        <div className="section-bottom">
          <YinYangButton 
            onClick={onTransition} 
            onPositionChange={onButtonPositionChange}
          />
        </div>
      )}
    </section>
  )
})

MainSection.displayName = 'MainSection'

export default MainSection
