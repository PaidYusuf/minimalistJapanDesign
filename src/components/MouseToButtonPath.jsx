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
      const numberOfPoints = Math.min(Math.max(Math.floor(distance / 50), 3), 20)
      
      if (distance < 100) {
        setPathPoints([])
        return
      }

      const points = []
      
      // Determine curve direction based on mouse position relative to button
      const mouseIsOnRight = startX > endX
      const curveDirection = mouseIsOnRight ? -1 : 1 // Negative degrees for right, positive for left
      const curveMagnitude = Math.min(distance * 0.25, 120) // Dynamic curve magnitude
      
      for (let i = 1; i <= numberOfPoints; i++) {
        const progress = i / (numberOfPoints + 1)
        
        // Linear interpolation for base position
        const baseX = startX + (endX - startX) * progress
        const baseY = startY + (endY - startY) * progress
        
        // Create smooth arc using sine function
        const curveOffset = Math.sin(progress * Math.PI) * curveMagnitude * curveDirection
        
        // Calculate perpendicular direction for curve offset
        const lineAngle = Math.atan2(endY - startY, endX - startX)
        const perpAngle = lineAngle + Math.PI / 2
        
        const finalX = baseX + Math.cos(perpAngle) * curveOffset
        const finalY = baseY + Math.sin(perpAngle) * curveOffset
        
        points.push({
          x: finalX,
          y: finalY,
          delay: i * 0.1,
          scale: 0.6 + Math.sin(progress * Math.PI) * 0.4
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
