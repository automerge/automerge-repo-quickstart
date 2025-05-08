import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "@picocss/pico/css/pico.min.css";
import "./index.css";

import { initTaskList } from "./components/TaskList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading a document...</div>}>
      <App taskList={initTaskList()} />
    </Suspense>
  </React.StrictMode>,
);
