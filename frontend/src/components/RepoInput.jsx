import { useState } from "react";


function RepoInput({
  onAnalyze,
  analyzing,
  error
}) {

  const [repoUrl, setRepoUrl] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const value = repoUrl.trim();

    if (!value || analyzing) {
      return;
    }

    onAnalyze(value);
  };


  return (
    <div className="repo-form">

      <form
        onSubmit={handleSubmit}
        className="repo-input-wrapper"
      >

        <div className="github-icon">

          <svg
            viewBox="0 0 24 24"
            width="21"
            height="21"
            fill="currentColor"
          >
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.26c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6-.81c.68-.23 2.3-.95 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
          </svg>

        </div>


        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          disabled={analyzing}
          required
        />


        <button
          className="repo-submit"
          type="submit"
          disabled={analyzing}
        >

          {analyzing ? (
            <>
              <span className="button-spinner"></span>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze</span>
              <span className="arrow">→</span>
            </>
          )}

        </button>

      </form>


      {error && (
        <div className="repo-error">
          <span>!</span>
          {error}
        </div>
      )}


      {!error && (
        <div className="input-hint">
          <span>⌘</span>
          Public GitHub repositories only
        </div>
      )}

    </div>
  );
}


export default RepoInput;