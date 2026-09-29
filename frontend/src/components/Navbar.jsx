function Navbar({ page, onHome }) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={onHome}>
          <div className="brand-mark">
            <span>✦</span>
          </div>

          <div>
            <div className="brand-name">CodePilot</div>
            <div className="brand-subtitle">AI Software Engineer</div>
          </div>
        </button>

        <div className="nav-links">
          <button
            className={page === "home" ? "nav-link active" : "nav-link"}
            onClick={onHome}
          >
            Home
          </button>

          <a href="#features" className="nav-link">
            Features
          </a>

          <a href="#how-it-works" className="nav-link">
            How it works
          </a>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          Local AI
        </div>
      </div>
    </nav>
  );
}

export default Navbar;