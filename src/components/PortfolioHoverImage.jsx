import { useState, useEffect } from 'react'

const PortfolioHoverImage = ({ showFullPortfolio = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Project images mapping
  const projectImages = {
    'tubitak': '/images/tubitak-project.jpg',
    'teknofest': '/images/teknofest-drone.jpg',
    'monochrome-todo': '/images/monochrome-todo.jpg',
    'aslan-otomotiv': '/images/aslan-otomotiv.jpg',
    'beach-robot': '/images/beach-robot.jpg',
    'weight-drone': '/images/weight-drone.jpg'
  }

  useEffect(() => {
    // Only add event listeners when full portfolio is visible
    if (!showFullPortfolio) {
      // Reset state when not showing portfolio
      setHoveredProject(null)
      setIsVisible(false)
      return
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Check if we're hovering over a project card on every mouse move
      const projectCard = e.target.closest('.project-card')
      if (projectCard) {
        const projectTitle = projectCard.querySelector('h3')?.textContent
        let projectKey = null

        // Map project titles to image keys
        if (projectTitle?.includes('TÜBİTAK')) projectKey = 'tubitak'
        else if (projectTitle?.includes('TEKNOFEST')) projectKey = 'teknofest'
        else if (projectTitle?.includes('Monochrome-Todo')) projectKey = 'monochrome-todo'
        else if (projectTitle?.includes('Aslan Otomotiv')) projectKey = 'aslan-otomotiv'
        else if (projectTitle?.includes('Beach Cleaning')) projectKey = 'beach-robot'
        else if (projectTitle?.includes('Weight Carrier')) projectKey = 'weight-drone'

        if (projectKey && projectKey !== hoveredProject) {
          setHoveredProject(projectKey)
          setIsVisible(true)
        }
      } else {
        // Mouse is not over any project card
        if (isVisible) {
          setIsVisible(false)
          setTimeout(() => setHoveredProject(null), 150) // Shorter delay
        }
      }
    }

    const handleMouseEnter = (e) => {
      const projectCard = e.currentTarget
      const projectTitle = projectCard.querySelector('h3')?.textContent
      let projectKey = null

      // Map project titles to image keys
      if (projectTitle?.includes('TÜBİTAK')) projectKey = 'tubitak'
      else if (projectTitle?.includes('TEKNOFEST')) projectKey = 'teknofest'
      else if (projectTitle?.includes('Monochrome-Todo')) projectKey = 'monochrome-todo'
      else if (projectTitle?.includes('Aslan Otomotiv')) projectKey = 'aslan-otomotiv'
      else if (projectTitle?.includes('Beach Cleaning')) projectKey = 'beach-robot'
      else if (projectTitle?.includes('Weight Carrier')) projectKey = 'weight-drone'

      if (projectKey) {
        setHoveredProject(projectKey)
        setIsVisible(true)
      }
    }

    const handleMouseLeave = (e) => {
      // Check if the mouse is leaving to another project card
      const relatedTarget = e.relatedTarget
      const isMovingToAnotherCard = relatedTarget?.closest('.project-card')
      
      if (!isMovingToAnotherCard) {
        setIsVisible(false)
        setTimeout(() => setHoveredProject(null), 100) // Very short delay
      }
    }

    // Add global mouse move listener for responsive tracking
    document.addEventListener('mousemove', handleMouseMove)
    
    // Add hover listeners to all project cards immediately
    const addHoverListeners = () => {
      const projectCards = document.querySelectorAll('.project-card')
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)
      })
      return projectCards.length
    }

    // Try to add listeners immediately, then retry if needed
    let cardCount = addHoverListeners()
    let retryCount = 0
    const maxRetries = 5

    const retryAddListeners = () => {
      if (cardCount === 0 && retryCount < maxRetries) {
        setTimeout(() => {
          cardCount = addHoverListeners()
          retryCount++
          if (cardCount === 0) {
            retryAddListeners()
          }
        }, 50 * (retryCount + 1)) // Exponential backoff
      }
    }

    if (cardCount === 0) {
      retryAddListeners()
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      const projectCards = document.querySelectorAll('.project-card')
      projectCards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [showFullPortfolio, hoveredProject, isVisible]) // Add dependencies

  // Generate fallback SVG based on project type
  const generateFallbackSVG = (projectKey) => {
    const configs = {
      'tubitak': { color: '#4a90e2', icon: '🔬', title: 'Research' },
      'teknofest': { color: '#e74c3c', icon: '🚁', title: 'Drone Tech' },
      'monochrome-todo': { color: '#2ecc71', icon: '📝', title: 'Web App' },
      'aslan-otomotiv': { color: '#f39c12', icon: '🚗', title: 'Website' },
      'beach-robot': { color: '#1abc9c', icon: '🤖', title: 'Robotics' },
      'weight-drone': { color: '#9b59b6', icon: '📦', title: 'Autonomous' }
    }
    
    const config = configs[projectKey] || { color: '#666', icon: '💻', title: 'Project' }
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${config.color};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${config.color};stop-opacity:0.4" />
          </linearGradient>
        </defs>
        <rect width="200" height="120" fill="url(#grad)" rx="8"/>
        <rect x="1" y="1" width="198" height="118" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" rx="8"/>
        <text x="100" y="50" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">${config.icon}</text>
        <text x="100" y="80" font-family="'Noto Sans JP', Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.9)" text-anchor="middle">${config.title}</text>
        <text x="100" y="95" font-family="'Noto Sans JP', Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.7)" text-anchor="middle">Preview</text>
      </svg>
    `)}`
  }

  // Don't render anything if not showing portfolio or no hovered project
  if (!showFullPortfolio || !hoveredProject) return null

  return (
    <div 
      className={`portfolio-hover-image ${isVisible ? 'visible' : ''}`}
      style={{
        left: mousePosition.x + 20, // Offset from cursor
        top: mousePosition.y - 80   // Offset from cursor
      }}
    >
      <img 
        src={projectImages[hoveredProject]} 
        alt={`${hoveredProject} preview`}
        onError={(e) => {
          // Use generated fallback SVG
          e.target.src = generateFallbackSVG(hoveredProject)
        }}
      />
    </div>
  )
}

export default PortfolioHoverImage
