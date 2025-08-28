const Navigation = ({ mainRef, aboutRef, portfolioRef, contactRef, showFullPortfolio }) => {
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <nav className="navigation">
      <div className="nav-item" onClick={() => scrollToSection(mainRef)}>
        <span className="nav-text">
          <span className="nav-english">Main</span>
          <span className="nav-japanese">主要</span>
        </span>
      </div>
      {showFullPortfolio && (
        <>
          <div className="nav-item" onClick={() => scrollToSection(aboutRef)}>
            <span className="nav-text">
              <span className="nav-english">About</span>
              <span className="nav-japanese">私について</span>
            </span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection(portfolioRef)}>
            <span className="nav-text">
              <span className="nav-english">Portfolio</span>
              <span className="nav-japanese">作品集</span>
            </span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection(contactRef)}>
            <span className="nav-text">
              <span className="nav-english">Contact</span>
              <span className="nav-japanese">コンタクト</span>
            </span>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navigation
