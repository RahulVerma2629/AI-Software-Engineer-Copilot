import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Home from "./pages/Home";
import Assistant from "./pages/Assistant";

import { analyzeRepository } from "./services/api";

function App() {

  const [page, setPage] = useState("home");

  const [repository, setRepository] =
    useState(null);

  const [analyzing, setAnalyzing] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleAnalyze = async (repoUrl) => {

    setError("");
    setAnalyzing(true);

    try {

      const data =
        await analyzeRepository(repoUrl);

      setRepository({
        repoId: data.repo_id,
        url: data.repo_url,
        files: data.total_files,
        chunks: data.total_chunks,
        embeddingDimension:
          data.embedding_dimension,
        vectorCount:
          data.vector_count,
      });

      setPage("assistant");

    } catch (err) {

      setError(
        err.message ||
        "Unable to analyze repository."
      );

    } finally {

      setAnalyzing(false);

    }
  };

  const navigate = (destination) => {

    setPage(destination);

    setError("");

  };

  return (
    <div className="app-shell">

      <Sidebar
        page={page}
        onNavigate={navigate}
        repository={repository}
      />

      <div className="workspace">

        <Topbar
          page={page}
          repository={repository}
        />

        <main className="workspace-content">

          {page === "home" ? (

            <Home
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
              error={error}
            />

          ) : (

            <Assistant
              repository={repository}
              onHome={() =>
                navigate("home")
              }
            />

          )}

        </main>

      </div>

    </div>
  );
}

export default App;