import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import { TaskList } from "./TaskList";

function App({ taskList }: { taskList: TaskList }) {
  return (
    <>
      <header>
        <h1>
          <img src={automergeLogo} alt="Automerge logo" id="automerge-logo" />
          Automerge Task List
        </h1>
      </header>

      <main>
        <div className="task-list">
          <TaskList taskList={taskList} />
        </div>
      </main>

      <footer>
        <p className="footer-copy">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
