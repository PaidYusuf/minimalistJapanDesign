import { useState, useEffect, useRef } from 'react'

const MouseToButtonPath = ({ isVisible, buttonPosition }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [pathPoints, setPathPoints] = useState([])
  const animationRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || !buttonPosition) return

    const generatePathPoints = () => {
      const startX = mousePosition.x
      const startY = mousePosition.y
      const endX = buttonPosition.x
      const endY = buttonPosition.y

      const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)
      const numberOfPoints = Math.min(Math.max(Math.floor(distance / 50), 3), 8)
      
      const points = []
      
      for (let i = 1; i <= numberOfPoints; i++) {
        const progress = i / (numberOfPoints + 1)
        
        // Create a curved path with some randomness
        const baseX = startX + (endX - startX) * progress
        const baseY = startY + (endY - startY) * progress
        
        // Add slight curve variation
        const curveOffset = Math.sin(progress * Math.PI) * 30
        const perpX = -(endY - startY) / distance
        const perpY = (endX - startX) / distance
        
        points.push({
          x: baseX + perpX * curveOffset,
          y: baseY + perpY * curveOffset,
          delay: i * 0.1,
          scale: 0.8 + Math.sin(progress * Math.PI) * 0.4
        })
      }
      
      setPathPoints(points)
    }

    generatePathPoints()
    
    // Update path periodically for smooth animation
    const interval = setInterval(generatePathPoints, 100)
    
    return () => clearInterval(interval)
  }, [mousePosition, buttonPosition, isVisible])

  if (!isVisible) return null

  return (
    <div className="mouse-to-button-path">
      {pathPoints.map((point, index) => (
        <div
          key={`${point.x}-${point.y}-${index}`}
          className="path-dot"
          style={{
            left: point.x,
            top: point.y,
            animationDelay: `${point.delay}s`,
            transform: `translate(-50%, -50%) scale(${point.scale})`
          }}
        />
      ))}
    </div>
  )
}

export default MouseToButtonPath
