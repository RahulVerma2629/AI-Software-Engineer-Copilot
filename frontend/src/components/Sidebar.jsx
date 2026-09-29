import {
  LayoutDashboard,
  Sparkles,
  Search,
  ChevronDown,
  Folder,
  FileCode2,
  FileJson,
  CircleCheck,
  GitBranch,
} from "lucide-react";

function Sidebar({
  page,
  onNavigate,
  repository,
}) {
  const repoName =
    repository?.url
      ?.split("/")
      .pop()
      ?.replace(".git", "") || "No repository";

  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Sparkles size={15} />
        </div>

        <div>
          <div className="sidebar-brand-name">
            CodePilot
          </div>

          <div className="sidebar-brand-subtitle">
            Software Engineer
          </div>
        </div>
      </div>

      {/* WORKSPACE */}
      <div className="sidebar-section">

        <div className="sidebar-section-title">
          Workspace
        </div>

        <button
          className={`sidebar-item ${
            page === "home" ? "active" : ""
          }`}
          onClick={() => onNavigate("home")}
        >
          <LayoutDashboard size={15} />
          <span>Overview</span>
        </button>

        <button
          className={`sidebar-item ${
            page === "assistant" ? "active" : ""
          }`}
          onClick={() => onNavigate("assistant")}
        >
          <Sparkles size={15} />
          <span>AI Assistant</span>
        </button>

        <button
          className="sidebar-item"
          onClick={() => {}}
        >
          <Search size={15} />
          <span>Code Search</span>

          <span className="coming-soon">
            Soon
          </span>
        </button>

      </div>

      {/* REPOSITORY */}
      <div className="sidebar-section repository-section">

        <div className="sidebar-section-title repository-title">
          <span>Repository</span>

          {repository && (
            <CircleCheck
              size={12}
              className="repo-check"
            />
          )}
        </div>

        {repository ? (
          <>
            <div className="sidebar-repo-name">
              <GitBranch size={12} />
              <span>{repoName}</span>
            </div>

            <div className="repo-tree">

              <div className="tree-folder">
                <ChevronDown size={13} />
                <Folder size={13} />
                <span>src</span>
              </div>

              <div className="tree-file">
                <FileCode2 size={13} />
                <span>App.js</span>
              </div>

              <div className="tree-file">
                <FileCode2 size={13} />
                <span>index.js</span>
              </div>

              <div className="tree-file">
                <FileCode2 size={13} />
                <span>components</span>
              </div>

              <div className="tree-file">
                <FileJson size={13} />
                <span>package.json</span>
              </div>

              <div className="tree-file">
                <FileJson size={13} />
                <span>app.json</span>
              </div>

            </div>
          </>
        ) : (
          <div className="no-repository">
            <Folder size={15} />

            <span>
              No repository indexed
            </span>
          </div>
        )}

      </div>

      {/* STATUS */}
      <div className="sidebar-bottom">

        <div className="sidebar-status-card">

          <div className="status-header">

            <div className="status-label">
              Repository
            </div>

            <div className="status-indicator">
              <span></span>
              {repository ? "Ready" : "Waiting"}
            </div>

          </div>

          {repository ? (
            <div className="status-stats">

              <div>
                <strong>
                  {repository.files}
                </strong>

                <span>
                  Files
                </span>
              </div>

              <div>
                <strong>
                  {repository.chunks}
                </strong>

                <span>
                  Chunks
                </span>
              </div>

              <div>
                <strong>
                  {repository.embeddingDimension}
                </strong>

                <span>
                  Dimensions
                </span>
              </div>

            </div>
          ) : (
            <p className="status-empty">
              Connect a GitHub repository
              to start analyzing your code.
            </p>
          )}

        </div>

        <div className="sidebar-footer">
          CodePilot v1.0
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;