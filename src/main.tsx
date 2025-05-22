import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "@picocss/pico/css/pico.min.css";
import "./index.css";

import { type TaskList, initTaskList } from "./components/TaskList.tsx";

import {
  Repo,
  WebSocketClientAdapter,
  IndexedDBStorageAdapter,
  RepoContext,
  isValidAutomergeUrl,
} from "@automerge/react";

const repo = new Repo({
  network: [new WebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});

// Check the URL for a document to load
const locationHash = document.location.hash.substring(1);
// Depending if we have an AutomergeUrl, either find or create the document
let handle;
if (isValidAutomergeUrl(locationHash)) {
  handle = await repo.find(locationHash);
} else {
  handle = repo.create<TaskList>(initTaskList());
  // Set the location hash to the new document we just made.
  document.location.hash = handle.url;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading a document...</div>}>
      <RepoContext.Provider value={repo}>
        <App docUrl={handle.url} />
      </RepoContext.Provider>
    </Suspense>
  </React.StrictMode>,
);
