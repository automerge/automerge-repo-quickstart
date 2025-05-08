import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { useState } from "react";

export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  tasks: Task[];
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <header>
        <h1>
          <img src={automergeLogo} alt="Automerge logo" id="automerge-logo" />
          Automerge Task List
        </h1>
      </header>

      <button
        type="button"
        onClick={() => {
          setTasks([
            ...tasks,
            {
              title: "",
              done: false,
            },
          ]);
        }}
      >
        <b>+</b> New task
      </button>

      <div id="task-list">
        {tasks?.map(({ title, done }, index) => (
          <div className="task" key={index}>
            <input
              type="checkbox"
              checked={done}
              onChange={() =>
                setTasks(
                  tasks.map((task, i) =>
                    i === index ? { ...task, done: !task.done } : task
                  )
                )
              }
            />

            <input
              type="text"
              placeholder="What needs doing?"
              value={title || ""}
              onChange={(e) =>
                setTasks(
                  tasks.map((task, i) =>
                    i === index ? { ...task, title: e.target.value } : task
                  )
                )
              }
              style={done ? { textDecoration: "line-through" } : {}}
            />
          </div>
        ))}
      </div>

      <footer>
        <p className="read-the-docs">
          Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  );
}

export default App;
