import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App, { type TaskList } from "./App.tsx";

import "./index.css";

import {
  isValidAutomergeUrl,
  Repo,
  WebSocketClientAdapter,
  IndexedDBStorageAdapter,
  RepoContext,
  type AutomergeUrl,
  DocHandle,
} from "@automerge/react";

const repo = new Repo({
  network: [new WebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});

const rootDocUrl = `${document.location.hash.substring(1)}`;
let handle: DocHandle<TaskList>;
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = await repo.find(rootDocUrl);
} else {
  handle = repo.create<TaskList>({ tasks: [] });
}
document.location.hash = handle.url;

function Root() {
  const [docUrl, setDocUrl] = useState<AutomergeUrl>(handle.url);

  useEffect(() => {
    const handleHashChange = () => {
      setDocUrl(document.location.hash.substring(1) as AutomergeUrl);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <RepoContext.Provider value={repo}>
          <App docUrl={docUrl} />
        </RepoContext.Provider>
      </Suspense>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
