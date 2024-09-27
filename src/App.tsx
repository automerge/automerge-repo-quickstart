import automergeLogo from '/automerge.png'
import '@picocss/pico/css/pico.min.css'
import './App.css'
import { useDocument } from '@automerge/automerge-repo-react-hooks'
import type { AutomergeUrl } from '@automerge/automerge-repo'


export interface Task {
  title: string;
  done: boolean;
}

export interface TaskList {
  tasks: Task[];
}


function App({ docUrl }: { docUrl: AutomergeUrl }) {

  const [doc, changeDoc] = useDocument<TaskList>(docUrl)

  return (
    <>
      <header>
          <a href="https://automerge.org" target="_blank">
            <img src={automergeLogo} className="logo" alt="Automerge logo" />
          </a>
        <h1>
          Automerge Task List
        </h1>
      </header>


      <button type="button" onClick={() => {
        changeDoc(d =>
          d.tasks.unshift({
            title: 'Build with Automerge',
            done: false
          })
        );
      }}>
        <b>+</b> New task
      </button>

      <div id='task-list'>

      {doc && doc.tasks?.map(({ title, done }, index) =>
        <div className='task' key={index}>
          <input
            type="checkbox"
            checked={done}
            onChange={() => changeDoc(d => {
              d.tasks[index].done = !d.tasks[index].done;
            })}
          />

          <input type="text"
            placeholder='What needs doing?' value={title || ''}
            onChange={(e) => changeDoc(d => {
              d.tasks[index].title = e.target.value;
            })} />
        </div>)
      }

      </div>



      <footer>
        <p className="read-the-docs">Powered by Automerge + Vite + React + TypeScript
        </p>
      </footer>
    </>
  )
}

export default App
