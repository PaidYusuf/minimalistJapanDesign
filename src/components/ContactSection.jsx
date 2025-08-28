import { forwardRef } from 'react'

const ContactSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="section contact-section">
      <div className="blur-shape contact-blur"></div>
      <div className="section-header">
        <h2 className="section-title">Contact</h2>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-grid">
            <div className="contact-item">
              <span className="label">Email</span>
              <span className="value">yusuf@example.com</span>
            </div>
            <div className="contact-item">
              <span className="label">LinkedIn</span>
              <span className="value">linkedin.com/in/yusuf</span>
            </div>
            <div className="contact-item">
              <span className="label">GitHub</span>
              <span className="value">github.com/yusuf</span>
            </div>
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
    </section>
  )
})

ContactSection.displayName = 'ContactSection'

export default ContactSection
