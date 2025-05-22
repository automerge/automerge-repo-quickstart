import { useState } from "react";
import { type AutomergeUrl, isValidAutomergeUrl } from "@automerge/react";

interface SyncControlsProps {
  docUrl: AutomergeUrl;
}

export const SyncControls: React.FC<SyncControlsProps> = ({ docUrl }) => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importUrl, setImportUrl] = useState("");

  const handleExport = () => {
    navigator.clipboard.writeText(docUrl);
  };

  const handleImport = () => {
    try {
      if (isValidAutomergeUrl(importUrl)) {
        localStorage.setItem("rootDocUrl", importUrl);
        window.location.reload();
      } else {
        alert("Invalid Automerge URL");
      }
    } catch (e) {
      alert("Invalid URL");
    }
  };

  return (
    <div className="sync-controls">
      <button onClick={handleExport}>Export URL</button>
      <button onClick={() => setShowImportDialog(true)}>Import URL</button>

      {showImportDialog && (
        <dialog open>
          <article>
            <header>
              <h3>Import Document URL</h3>
            </header>
            <input
              type="text"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder="Paste document URL here"
            />
            <footer>
              <button onClick={handleImport}>Import</button>
              <button onClick={() => setShowImportDialog(false)}>Cancel</button>
            </footer>
          </article>
        </dialog>
      )}
    </div>
  );
};
