import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import { useDocument, type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { RootDocument } from "../rootDoc";
import { DocumentList } from "./DocumentList";
import { useState } from "react";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [doc] = useDocument<RootDocument>(docUrl, {
    suspense: true,
  });
  const [selectedDocUrl, setSelectedDocUrl] = useState<AutomergeUrl | null>(
    null,
  );

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
            onSelectDocument={setSelectedDocUrl}
            selectedDocument={selectedDocUrl}
          />
        </div>
        <div className="task-list">
          {selectedDocUrl ? <TaskList docUrl={selectedDocUrl} /> : null}
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
