import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import { type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  return (
    <>
      <header>
        <h1>
          <img src={automergeLogo} alt="Automerge logo" id="automerge-logo" />
          Automerge Task List
        </h1>
      </header>

      <main>
        <div className="document-list">
          <DocumentList
            docUrl={docUrl}
          />
        </div>
        <div className="task-list">
          <TaskList docUrl={docUrl} />
        </div>
      </main>

      <footer>
        <p className="footer-copy">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
