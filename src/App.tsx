import automergeLogo from "/automerge.png";
import "@picocss/pico/css/pico.min.css";
import "./App.css";
import {
  useDocument,
  updateText,
  type AutomergeUrl,
  useDocHandle,
} from "@automerge/react";

export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  tasks: Task[];
}

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [doc, changeDoc] = useDocument<TaskList>(docUrl);

  const [historyIndex, setHistoryIndex] = useState(0);
  const handle = useDocHandle<TaskList>(docUrl);
  const history = handle?.history() || [];

  return (
    <>
      <header>
        <h1>
          <img src={automergeLogo} alt="Automerge logo" id="automerge-logo" />
          Automerge Task List
        </h1>
      </header>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={history.length}
          step={1}
          value={historyIndex}
          onChange={(e) => {
            if (!handle) return;

            const newIndex = Number(e.target.value);
            setHistoryIndex(newIndex);

            window.location.hash = newIndex
              ? handle.view(history[history.length - newIndex]).url
              : "automerge:" + handle.documentId;
          }}
        />

        <div>
          {historyIndex === 0 ? "Latest" : `${historyIndex} changes ago`}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          changeDoc((d) =>
            d.tasks.unshift({
              title: "",
              done: false,
            })
          );
        }}
      >
        <b>+</b> New task
      </button>

      <div id="task-list">
        {doc &&
          doc.tasks?.map(({ title, done }, index) => (
            <div className="task" key={index}>
              <input
                type="checkbox"
                checked={done}
                onChange={() =>
                  changeDoc((d) => {
                    d.tasks[index].done = !d.tasks[index].done;
                  })
                }
              />

              <input
                type="text"
                placeholder="What needs doing?"
                value={title || ""}
                onChange={(e) =>
                  changeDoc((d) => {
                    // updateText has an awkward API, it takes the
                    // document, the path, and then the new value.
                    updateText(d, ["tasks", index, "title"], e.target.value);
                  })
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
