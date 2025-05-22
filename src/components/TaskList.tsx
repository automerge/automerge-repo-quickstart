import "@picocss/pico/css/pico.min.css";
import "../index.css";
import { AutomergeUrl, useDocument } from "@automerge/react";

export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  title: string;
  tasks: Task[];
}

// A helper function to consistently initialize a task list.
export function initTaskList() {
  return {
    title: `TODO: ${new Date().toLocaleString()}`,
    tasks: [{ done: false, title: "" }],
  };
}

export const TaskList: React.FC<{
  docUrl: AutomergeUrl;
}> = ({ docUrl }) => {
  const [doc, changeDoc] = useDocument<TaskList>(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });

  return (
    <>
      <button type="button">
        <b>+</b> New task
      </button>

      <div id="task-list">
        {doc &&
          doc.tasks?.map(({ title, done }, index) => (
            <div className="task" key={index}>
              <input type="checkbox" checked={done} />

              <input
                type="text"
                placeholder="What needs doing?"
                value={title || ""}
                style={done ? { textDecoration: "line-through" } : {}}
              />
            </div>
          ))}
      </div>
    </>
  );
};
