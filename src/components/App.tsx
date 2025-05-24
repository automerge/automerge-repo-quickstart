import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { type AutomergeUrl, isValidAutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";
import { SyncControls } from "./SyncControls";
import { useHash } from "react-use";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [hash, setHash] = useHash();

  // Get current document from hash
  const currentDocument =
    hash.slice(1) && isValidAutomergeUrl(hash.slice(1))
      ? (hash.slice(1) as AutomergeUrl)
      : undefined;

  // Update current document (via hash)
  const setCurrentDocument = (doc: AutomergeUrl) => setHash(doc);

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
            selectedDocument={currentDocument}
            onSelectDocument={setCurrentDocument}
          />
        </div>
        <div className="task-list">
          {currentDocument ? (
            <TaskList docUrl={currentDocument} />
          ) : (
            <div>Select a task list to get started...</div>
          )}
        </div>
      </main>

      <footer>
        <SyncControls docUrl={docUrl} />
        <p className="footer-copy">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
