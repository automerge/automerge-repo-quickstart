import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { type AutomergeUrl, isValidAutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import { DocumentList } from "./DocumentList";
import { SyncControls } from "./SyncControls";
import { useState, useEffect } from "react";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  /** Location Hash Sharing URLs
   * For this application we allow sharing documents by using the hash part of the URL.
   * The following code subscribes to the hash so that we can update the current document when the hash changes.
   * It also updates the hash when the current document changes.
   */
  const getDocumentFromHash = () => {
    const hash = window.location.hash.slice(1);
    return hash && isValidAutomergeUrl(hash)
      ? (hash as AutomergeUrl)
      : undefined;
  };

  const [currentDocument, setCurrentDocument] = useState<
    AutomergeUrl | undefined
  >(getDocumentFromHash());

  // Update hash when document changes
  useEffect(() => {
    if (currentDocument && currentDocument !== getDocumentFromHash()) {
      window.location.hash = currentDocument;
    }
  }, [currentDocument]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const newDoc = getDocumentFromHash();
      if (newDoc && newDoc !== currentDocument) {
        setCurrentDocument(newDoc);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [currentDocument]);

  /** Main App */
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
