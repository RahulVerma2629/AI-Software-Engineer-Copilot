import {
  GitBranch,
  CircleCheck,
  Command,
  Code2,
} from "lucide-react";

function Topbar({
  repository,
  page,
}) {
  const repoName =
    repository?.url
      ?.split("/")
      .pop()
      ?.replace(".git", "") || "Workspace";

  return (
    <header className="workspace-topbar">

      <div className="topbar-left">

        <div className="breadcrumb">
          <span>CodePilot</span>

          <span className="breadcrumb-separator">
            /
          </span>

          <strong>
            {page === "assistant"
              ? "AI Assistant"
              : "Overview"}
          </strong>
        </div>

        {repository && (
          <div className="topbar-repository">

            <Code2 size={13} />

            <span>
              {repoName}
            </span>

            <span className="topbar-divider" />

            <GitBranch size={12} />

            <span>
              main
            </span>

            <span className="topbar-ready">
              <CircleCheck size={11} />
              Ready
            </span>

          </div>
        )}

      </div>

      <div className="topbar-right">

        <div className="ai-status">
          <span />
          Local AI
        </div>

        <div className="shortcut">
          <Command size={11} />
          <span>K</span>
        </div>

        <div className="topbar-avatar">
          C
        </div>

      </div>

    </header>
  );
}

export default Topbar;