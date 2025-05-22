import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "@picocss/pico/css/pico.min.css";
import "./index.css";

import {
  type DocumentList,
  initDocumentList,
} from "./components/DocumentList.tsx";
import { type TaskList, initTaskList } from "./components/TaskList.tsx";

import {
  isValidAutomergeUrl,
  Repo,
  WebSocketClientAdapter,
  IndexedDBStorageAdapter,
  RepoContext,
  AutomergeUrl,
} from "@automerge/react";

const repo = new Repo({
  network: [new WebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});

let rootDocUrl = localStorage.getItem("rootDocUrl") as AutomergeUrl;
if (!isValidAutomergeUrl(rootDocUrl)) {
  // We're in the "new user" case, so set up with some basic data
  const taskListHandle = repo.create<TaskList>(initTaskList());
  const docListhandle = repo.create<DocumentList>(
    initDocumentList([taskListHandle.url]),
  );
  rootDocUrl = docListhandle.url;
  localStorage.setItem("rootDocUrl", rootDocUrl);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading a document...</div>}>
      <RepoContext.Provider value={repo}>
        <App docUrl={rootDocUrl} />
      </RepoContext.Provider>
    </Suspense>
  </React.StrictMode>,
);
