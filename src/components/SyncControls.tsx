import { useState } from "react";
import { type AutomergeUrl, isValidAutomergeUrl } from "@automerge/react";
import { setRootDocUrl } from "../rootDoc";

interface SyncControlsProps {
  docUrl: AutomergeUrl;
}

export const SyncControls: React.FC<SyncControlsProps> = ({ docUrl }) => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [error, setError] = useState("");

  const handleExport = () => {
    navigator.clipboard.writeText(docUrl);
  };

  const handleImport = () => {
    if (!isValidAutomergeUrl(importUrl)) {
      setError("Invalid Automerge URL");
      return;
    }

    setRootDocUrl(importUrl);
    window.location.reload();
  };

  const closeDialog = () => {
    setShowImportDialog(false);
    setImportUrl("");
    setError("");
  };

  return (
    <div className="sync-controls">
      <button onClick={handleExport}>Copy account token</button>
      <button onClick={() => setShowImportDialog(true)}>
        Import account token
      </button>

      {showImportDialog && (
        <dialog open>
          <article>
            <header>
              <h3>Import your account token</h3>
            </header>
            <input
              type="text"
              value={importUrl}
              onChange={(e) => {
                setImportUrl(e.target.value);
                setError("");
              }}
              placeholder="Paste your account token URL here"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <footer>
              <button onClick={handleImport}>Import</button>
              <button onClick={closeDialog}>Cancel</button>
            </footer>
          </article>
        </dialog>
      )}
    </div>
  );
};
