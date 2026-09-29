import RepoInput from "../components/RepoInput";


function Home({
  onAnalyze,
  analyzing,
  error
}) {

  return (
    <main className="home-page">

      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>


      <section className="hero">

        <div className="hero-badge">
          <span className="badge-dot"></span>
          AI-powered code intelligence
        </div>


        <h1>
          Understand your codebase.
          <br />
          <span>Ask anything.</span>
        </h1>


        <p className="hero-description">
          Connect a GitHub repository and let CodePilot
          analyze your code, search through it semantically,
          and explain how everything works.
        </p>


        <RepoInput
          onAnalyze={onAnalyze}
          analyzing={analyzing}
          error={error}
        />


        <div className="hero-features">

          <div className="mini-feature">
            <span>✦</span>
            Local AI
          </div>

          <div className="feature-divider"></div>

          <div className="mini-feature">
            <span>⌕</span>
            Semantic Search
          </div>

          <div className="feature-divider"></div>

          <div className="mini-feature">
            <span>◈</span>
            RAG Powered
          </div>

        </div>

      </section>


      <section
        className="preview-section"
        id="features"
      >

        <div className="section-heading">

          <span className="section-label">
            CODE INTELLIGENCE
          </span>

          <h2>
            Everything you need to understand
            a repository.
          </h2>

          <p>
            Stop jumping between files. CodePilot
            brings your entire codebase into one
            intelligent workspace.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card large">

            <div>

              <div className="card-icon purple">
                ⌕
              </div>

              <h3>
                Semantic Code Search
              </h3>

              <p>
                Find the code that actually answers
                your question instead of searching
                for exact keywords.
              </p>

            </div>


            <div className="code-preview">

              <div className="code-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="code-line">
                <small>01</small>
                <span>
                  function <b>authenticateUser</b>() {"{"}
                </span>
              </div>

              <div className="code-line">
                <small>02</small>
                <span>
                  &nbsp;&nbsp;const token =
                  generateToken()
                </span>
              </div>

              <div className="code-line">
                <small>03</small>
                <span>
                  &nbsp;&nbsp;return token
                </span>
              </div>

              <div className="code-line">
                <small>04</small>
                <span>{"}"}</span>
              </div>

            </div>

          </div>


          <div className="feature-card">

            <div className="card-icon blue">
              ✦
            </div>

            <h3>
              AI Explanations
            </h3>

            <p>
              Ask questions about architecture,
              functions, APIs and implementation
              details.
            </p>

          </div>


          <div className="feature-card">

            <div className="card-icon green">
              ◈
            </div>

            <h3>
              Grounded Answers
            </h3>

            <p>
              Responses are generated from retrieved
              repository context to keep answers
              connected to your actual code.
            </p>

          </div>

        </div>

      </section>


      <section
        className="workflow-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            From repository to answers in seconds.
          </h2>

        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Connect
            </h3>

            <p>
              Paste a public GitHub repository URL.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Index
            </h3>

            <p>
              Your source files are chunked and
              indexed semantically.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Ask
            </h3>

            <p>
              Ask CodePilot questions about your
              codebase.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


export default Home;