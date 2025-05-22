import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { useDocument, type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";
import { useState } from "react";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  // the DocumentList should suspend until we have a currentDocument
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
          <TaskList docUrl={currentDocument} />
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
