import ChatBox from "../components/ChatBox";


function Assistant({
  repository,
  onHome
}) {

  return (
    <main className="assistant-page">

      <div className="assistant-bg"></div>


      <div className="assistant-container">


        <div className="assistant-header">

          <div>

            <button
              className="back-button"
              onClick={onHome}
            >
              ← Back
            </button>


            <div className="assistant-title-row">

              <div className="repo-avatar">
                {repository?.name
                  ?.charAt(0)
                  .toUpperCase() || "R"}
              </div>


              <div>

                <h1>
                  {repository?.url
                    ?.split("/")
                    .pop()
                    ?.replace(".git", "") ||
                    "Repository"}
                </h1>

                <p>
                  {repository?.url}
                </p>

              </div>

            </div>

          </div>


          <div className="ready-badge">

            <span></span>

            Repository Ready

          </div>

        </div>


        <div className="repo-stats">


          <div className="stat">

            <span className="stat-icon">
              ⌁
            </span>

            <div>

              <strong>
                {repository?.files ?? 0}
              </strong>

              <small>
                Files indexed
              </small>

            </div>

          </div>


          <div className="stat">

            <span className="stat-icon">
              ◈
            </span>

            <div>

              <strong>
                {repository?.chunks ?? 0}
              </strong>

              <small>
                Code chunks
              </small>

            </div>

          </div>


          <div className="stat">

            <span className="stat-icon">
              ✦
            </span>

            <div>

              <strong>
                {repository?.embeddingDimension ?? 0}
              </strong>

              <small>
                Embedding dimensions
              </small>

            </div>

          </div>


          <div className="stat">

            <span className="stat-icon">
              ⚡
            </span>

            <div>

              <strong>
                {repository?.vectorCount ?? 0}
              </strong>

              <small>
                Vectors indexed
              </small>

            </div>

          </div>


        </div>


        <ChatBox
          repository={repository}
        />

      </div>

    </main>
  );
}


export default Assistant;