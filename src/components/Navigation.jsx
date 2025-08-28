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
        <span>主要</span>
      </div>
      {showFullPortfolio && (
        <>
          <div className="nav-item" onClick={() => scrollToSection(aboutRef)}>
            <span>私について</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection(portfolioRef)}>
            <span>作品集</span>
          </div>
          <div className="nav-item" onClick={() => scrollToSection(contactRef)}>
            <span>コンタクト</span>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navigation
