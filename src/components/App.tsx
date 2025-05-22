import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { useDocument, type AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [doc, changeDoc] = useDocument<DocumentList>(docUrl, {
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

      <TaskList docUrl={doc.documents[0]} />

      <footer>
        <p className="read-the-docs">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
