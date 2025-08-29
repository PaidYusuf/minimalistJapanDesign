import { forwardRef } from 'react'
import PortfolioYinYangButton from './PortfolioYinYangButton'

const ContactSection = forwardRef(({ onLightModeTransition, onButtonPositionChange }, ref) => {
  return (
    <section ref={ref} className="section contact-section">
      <div className="blur-shape contact-blur"></div>
      <div className="light-source-container">
        <div className="light-source"></div>
        <div className="light-drop light-drop-1"></div>
        <div className="light-drop light-drop-2"></div>
        <div className="light-drop light-drop-3"></div>
        <div className="light-drop light-drop-4"></div>
        <div className="light-drop light-drop-5"></div>
        <div className="light-drop light-drop-6"></div>
        <div className="light-drop light-drop-7"></div>
        <div className="light-drop light-drop-8"></div>
        <div className="light-drop light-drop-9"></div>
        <div className="light-drop light-drop-10"></div>
      </div>
      <div className="section-header">
        <h2 className="section-title">Contact</h2>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <p className="contact-intro-text">
            Reach out, and together we will kindle light in the deepest shadows
          </p>
          <div className="contact-grid">
            <a href="mailto:yusuf.aslan.home@gmail.com" className="contact-item contact-link">
              <span className="label">Email</span>
              <span className="value">yusuf.aslan.home@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/yusufaslan-ai" target="_blank" rel="noopener noreferrer" className="contact-item contact-link">
              <span className="label">LinkedIn</span>
              <span className="value">linkedin.com/in/yusufaslan-ai</span>
            </a>
            <a href="https://github.com/PaidYusuf" target="_blank" rel="noopener noreferrer" className="contact-item contact-link">
              <span className="label">GitHub</span>
              <span className="value">github.com/PaidYusuf</span>
            </a>
            <div className="contact-item">
              <span className="label">Location</span>
              <span className="value">Turkey</span>
            </div>
          </div>
        </div>
        <div className="vertical-text-left">
          <span>連絡先</span>
        </div>
      </div>
      
      {/* Yin-Yang button for transitioning to light mode */}
      <div className="contact-bottom">
        <PortfolioYinYangButton 
          onClick={onLightModeTransition}
          onPositionChange={onButtonPositionChange}
        />
      </div>
    </section>
  )
})

ContactSection.displayName = 'ContactSection'

export default ContactSection
