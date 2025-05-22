import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";

import { initTaskList, type TaskList } from "./components/TaskList.tsx";

import {
  Repo,
  BroadcastChannelNetworkAdapter,
  IndexedDBStorageAdapter,
  RepoContext,
  isValidAutomergeUrl,
  DocHandle,
} from "@automerge/react";

const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter()],
  storage: new IndexedDBStorageAdapter(),
});

// Add the repo to the global window object so it can be accessed in the browser console
// This is useful for debugging and testing purposes.
declare global {
  interface Window {
    repo: Repo;
    // We also add the handle to the global window object for debugging
    handle: DocHandle<TaskList>;
  }
}
window.repo = repo;

// Check the URL for a document to load
const locationHash = document.location.hash.substring(1);
// Depending if we have an AutomergeUrl, either find or create the document
if (isValidAutomergeUrl(locationHash)) {
  window.handle = await repo.find(locationHash);
} else {
  window.handle = repo.create<TaskList>(initTaskList());
  // Set the location hash to the new document we just made.
  document.location.hash = window.handle.url;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading a document...</div>}>
      <RepoContext.Provider value={repo}>
        <App docUrl={window.handle.url} />
      </RepoContext.Provider>
    </Suspense>
  </React.StrictMode>,
);
