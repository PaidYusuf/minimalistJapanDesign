import { forwardRef } from 'react'

const MainSection = forwardRef((props, ref) => {
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
    </section>
  )
})

MainSection.displayName = 'MainSection'

export default MainSection
