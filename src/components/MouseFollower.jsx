import { useState, useEffect } from 'react'

const MouseFollower = ({ isLightMode = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div 
        className={`mouse-follower ${isLightMode ? 'light-mode' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
      {isLightMode && (
        <div 
          className="mouse-light"
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
        />
      )}
    </>
  )
}

export default MouseFollower
