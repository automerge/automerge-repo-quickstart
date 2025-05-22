import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import { useDocument, type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { RootDocument } from "../rootDoc";
import { DocumentList } from "./DocumentList";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [doc] = useDocument<RootDocument>(docUrl, {
    suspense: true,
  });

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
          <DocumentList docUrl={docUrl} />
        </div>
        <div className="task-list">
          <TaskList docUrl={doc.taskLists[0]} />
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
