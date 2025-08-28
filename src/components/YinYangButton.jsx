const YinYangButton = ({ onClick }) => {
  return (
    <div className="yin-yang-container">
      <button className="yin-yang-button" onClick={onClick}>
        <div className="yin-yang">
          <div className="yang"></div>
          <div className="yin"></div>
          <div className="dot-yang"></div>
          <div className="dot-yin"></div>
        </div>
      </button>
      <p className="button-hint">Discover the balance</p>
    </div>
  )
}

export default YinYangButton
