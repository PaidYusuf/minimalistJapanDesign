import { useState } from 'react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('main')

  const sections = {
    main: {
      title: '主要',
      content: (
        <div className="main-content">
          <div className="blur-shape"></div>
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
      )
    },
    about: {
      title: '私について',
      content: (
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
      )
    },
    portfolio: {
      title: 'ポートフォリオ',
      content: (
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
      )
    },
    contact: {
      title: 'コンタクト',
      content: (
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get In Touch</h3>
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
      )
    }
  }

  return (
    <div className="app">
      <nav className="navigation">
        <div className="nav-item" onClick={() => setCurrentSection('main')}>
          <span className={currentSection === 'main' ? 'active' : ''}>主要</span>
        </div>
        <div className="nav-item" onClick={() => setCurrentSection('about')}>
          <span className={currentSection === 'about' ? 'active' : ''}>私について</span>
        </div>
        <div className="nav-item" onClick={() => setCurrentSection('portfolio')}>
          <span className={currentSection === 'portfolio' ? 'active' : ''}>作品集</span>
        </div>
        <div className="nav-item" onClick={() => setCurrentSection('contact')}>
          <span className={currentSection === 'contact' ? 'active' : ''}>コンタクト</span>
        </div>
      </nav>

      <main className="main-container">
        {sections[currentSection].content}
      </main>

      <div className="page-indicator">
        <span className="current-page">{sections[currentSection].title}</span>
      </div>
    </div>
  )
}

export default App
