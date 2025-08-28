import { forwardRef } from 'react'

const PortfolioSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="section portfolio-section">
      <div className="blur-shape portfolio-blur"></div>
      <div className="section-header">
        <h2 className="section-title">Portfolio</h2>
      </div>
      <div className="portfolio-content">
        <div className="project-grid">
          <div className="project-card">
            <h3>TÜBİTAK 2209-A</h3>
            <p>Research project focusing on innovative solutions in technology</p>
            <span className="tech">Research • Innovation</span>
          </div>
          <div className="project-card">
            <h3>TEKNOFEST - Savaşan İHA</h3>
            <p>Combat UAV project for national technology competition</p>
            <span className="tech">Drones • Autonomous Systems</span>
          </div>
          <div className="project-card">
            <h3>Monochrome-Todo</h3>
            <p>Calendar todo list application with smooth, user-friendly interface</p>
            <span className="tech">React • UI/UX • Web Development</span>
          </div>
          <div className="project-card">
            <h3>Aslan Otomotiv</h3>
            <p>Complete website solution for automotive maintenance company</p>
            <span className="tech">Web Development • Business Solution</span>
          </div>
          <div className="project-card">
            <h3>Beach Cleaning Robot</h3>
            <p>Autonomous robot system for environmental cleanup operations</p>
            <span className="tech">Robotics • Environmental Tech</span>
          </div>
          <div className="project-card">
            <h3>Weight Carrier Drone</h3>
            <p>Autonomous payload delivery system with advanced navigation</p>
            <span className="tech">Drones • Autonomous Navigation</span>
          </div>
        </div>
      </div>
    </section>
  )
})

PortfolioSection.displayName = 'PortfolioSection'

export default PortfolioSection
