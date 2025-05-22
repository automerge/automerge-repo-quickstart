import "./TaskList.css";
import { useDocument, updateText, type AutomergeUrl } from "@automerge/react";

export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  title: string;
  tasks: Task[];
}

interface TaskListProps {
  docUrl: AutomergeUrl;
}

export function TaskList({ docUrl }: TaskListProps) {
  const [doc, changeDoc] = useDocument<TaskList>(docUrl);

  return (
    <>
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
                    updateText(d, ["tasks", index, "title"], e.target.value);
                  })
                }
                style={done ? { textDecoration: "line-through" } : {}}
              />
            </div>
          ))}
      </div>
    </>
  );
}
