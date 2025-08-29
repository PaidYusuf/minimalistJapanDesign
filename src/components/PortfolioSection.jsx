import { forwardRef, useEffect, useRef, useState } from 'react'

const PortfolioSection = forwardRef((props, ref) => {
  const [lightSourceY, setLightSourceY] = useState(0)
  const [splashEffects, setSplashEffects] = useState([])
  const rainContainerRef = useRef(null)

  // Calculate light source position
  useEffect(() => {
    const calculateLightSourcePosition = () => {
      // Find the contact section
      const contactSection = document.querySelector('.contact-section')
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect()
        const contactTop = contactRect.top + window.pageYOffset
        setLightSourceY(contactTop)
      }
    }

    // Calculate on mount and window resize
    calculateLightSourcePosition()
    window.addEventListener('resize', calculateLightSourcePosition)
    
    return () => window.removeEventListener('resize', calculateLightSourcePosition)
  }, [])

  // Create splash effect
  const createSplashEffect = (x, raindropIndex) => {
    const splashId = Date.now() + raindropIndex
    const splashParticles = []
    
    // Create multiple splash particles
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45) * (Math.PI / 180) // 8 directions, 45 degrees apart
      const velocity = Math.random() * 40 + 20 // Random velocity between 20-60
      const size = Math.random() * 3 + 2 // Random size between 2-5px
      
      splashParticles.push({
        id: `${splashId}-${i}`,
        x: x,
        y: 0, // Start at light source position (relative to rain container)
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size,
        life: 1.0, // Full life
        gravity: 0.8,
        startTime: Date.now()
      })
    }
    
    setSplashEffects(prev => [...prev, ...splashParticles])
    
    // Animate particles with physics
    const animateParticles = () => {
      setSplashEffects(prev => prev.map(particle => {
        if (!particle.id.startsWith(splashId.toString())) return particle
        
        const elapsed = (Date.now() - particle.startTime) / 16 // Convert to frame time
        const newVy = particle.vy + particle.gravity * elapsed
        const newX = particle.x + particle.vx * elapsed * 0.1
        const newY = particle.y + newVy * elapsed * 0.1
        const newLife = Math.max(0, particle.life - 0.02)
        
        return {
          ...particle,
          x: newX,
          y: newY,
          vy: newVy,
          life: newLife
        }
      }).filter(particle => particle.life > 0))
    }
    
    // Run animation for 2 seconds
    const animationInterval = setInterval(animateParticles, 16) // ~60fps
    setTimeout(() => {
      clearInterval(animationInterval)
      setSplashEffects(prev => prev.filter(particle => 
        !particle.id.startsWith(splashId.toString())
      ))
    }, 2000)
  }

  // Check collision with light source
  useEffect(() => {
    if (lightSourceY === 0 || !rainContainerRef.current) return

    const checkCollisions = () => {
      const rainContainer = rainContainerRef.current
      const rainContainerRect = rainContainer.getBoundingClientRect()
      const rainDrops = rainContainer.querySelectorAll('.rain-drop')
      
      rainDrops.forEach((drop, index) => {
        const dropRect = drop.getBoundingClientRect()
        const dropY = dropRect.top + window.pageYOffset
        const dropX = dropRect.left + dropRect.width / 2 - rainContainerRect.left
        
        // Check if raindrop head reaches light source position (with tolerance)
        if (Math.abs(dropY - lightSourceY) <= 15) {
          // Trigger splash effect
          createSplashEffect(dropX, index)
          
          // Reset raindrop animation to restart from top
          drop.style.animation = 'none'
          setTimeout(() => {
            drop.style.animation = ''
          }, 10)
        }
      })
    }

    const intervalId = setInterval(checkCollisions, 32) // ~30fps for performance
    return () => clearInterval(intervalId)
  }, [lightSourceY])

  return (
    <section ref={ref} className="section portfolio-section">
      <div className="blur-shape portfolio-blur"></div>
      <div className="rain-container" ref={rainContainerRef}>
        <div className="rain-drop rain-drop-1"></div>
        <div className="rain-drop rain-drop-2"></div>
        <div className="rain-drop rain-drop-3"></div>
        <div className="rain-drop rain-drop-4"></div>
        <div className="rain-drop rain-drop-5"></div>
        <div className="rain-drop rain-drop-6"></div>
        <div className="rain-drop rain-drop-7"></div>
        <div className="rain-drop rain-drop-8"></div>
        <div className="rain-drop rain-drop-9"></div>
        <div className="rain-drop rain-drop-10"></div>
        
        {/* Render splash particles */}
        {splashEffects.map((particle) => (
          <div
            key={particle.id}
            className="splash-particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.life,
              transform: `scale(${particle.life})`,
            }}
          />
        ))}
      </div>
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
