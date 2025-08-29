import { forwardRef } from 'react'

const AboutSection = forwardRef(({ portfolioRef }, ref) => {
  const scrollToPortfolio = () => {
    if (portfolioRef && portfolioRef.current) {
      portfolioRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section ref={ref} className="section about-section">
      <div className="blur-shape about-blur"></div>
      <div className="light-path-container">
        <div className="light-pulse"></div>
      </div>
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
      </div>
      <div className="about-content">
        <div className="info-grid">
          <div className="info-box">
            <h3>Education</h3>
            <p>Computer Engineering</p>
            <p>3rd Year Student</p>
          </div>
          <div className="info-box">
            <h3>Specialization</h3>
            <p>Autonomous Systems</p>
            <p>Web Development</p>
            <p>Robotics & Drones</p>
          </div>
          <div className="info-box">
            <h3>Research</h3>
            <p>TÜBİTAK 2209-A Project</p>
            <p>TEKNOFEST Participant</p>
          </div>
        </div>
        <div className="vertical-text-right">
          <span>関于我</span>
        </div>
      </div>
      <div 
        className="follow-light-button"
        onClick={scrollToPortfolio}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToPortfolio()
          }
        }}
      >
        <div className="scroll-icon">
          <div className="scroll-arrow"></div>
          <div className="scroll-arrow"></div>
        </div>
        <span className="scroll-text">follow the light</span>
      </div>
    </section>
  )
})

AboutSection.displayName = 'AboutSection'

export default AboutSection
