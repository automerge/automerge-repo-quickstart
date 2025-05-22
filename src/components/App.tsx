import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";
import { useState } from "react";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [currentDocument, setCurrentDocument] = useState<AutomergeUrl>();

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
          <DocumentList docUrl={docUrl} onSelectDocument={setCurrentDocument} />
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
        <p className="read-the-docs">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
