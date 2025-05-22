import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";

import { initTaskList } from "./components/TaskList.tsx";
import {
  Repo,
  BroadcastChannelNetworkAdapter,
  IndexedDBStorageAdapter,
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
  }
}
window.repo = repo;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading a document...</div>}>
      <App taskList={initTaskList()} />
    </Suspense>
  </React.StrictMode>,
);
