import "@picocss/pico/css/pico.min.css";
import "../index.css";
import { useState } from "react";

export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  title: string;
  tasks: Task[];
}

// A helper function to consistently initialize a task list.
export function initTaskList(): TaskList {
  return {
    title: `TODO: ${new Date().toLocaleString()}`,
    tasks: [{ done: false, title: "" }],
  };
}

export const TaskList: React.FC<{
  taskList: TaskList;
}> = ({ taskList }) => {
  const [tasks, setTasks] = useState(taskList.tasks);

  return (
    <>
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
                    i === index ? { ...task, done: !task.done } : task,
                  ),
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
                    i === index ? { ...task, title: e.target.value } : task,
                  ),
                )
              }
              style={done ? { textDecoration: "line-through" } : {}}
            />
          </div>
        ))}
      </div>
    </>
  );
};
