import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import { isValidAutomergeUrl, type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";
import { useHash } from "react-use";
import { SyncControls } from "./SyncControls";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [hash, setHash] = useHash();
  const cleanHash = hash.slice(1); // remove # symbol
  const currentDocument =
    cleanHash && isValidAutomergeUrl(cleanHash)
      ? (cleanHash as AutomergeUrl)
      : undefined;

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
            onSelectDocument={setHash}
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
