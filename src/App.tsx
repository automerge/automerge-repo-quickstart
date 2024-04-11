import automergeLogo from '/automerge.png'
import '@picocss/pico/css/pico.min.css'
import './App.css'
import { useDocument } from '@automerge/automerge-repo-react-hooks'
import type { AutomergeUrl } from '@automerge/automerge-repo'


export interface TodoDoc {
  task: string;
  done: boolean;
}


function App({ docUrl }: { docUrl: AutomergeUrl }) {

  const [doc, changeDoc] = useDocument<{ todos: TodoDoc[] }>(docUrl)

  return (
    <>
      <header>
        <h1>
          <a href="https://automerge.org" target="_blank">
            <img src={automergeLogo} className="logo" alt="Automerge logo" />
          </a>
          Automerge Task List
        </h1>
      </header>


      <button type="button" onClick={() => {
        changeDoc(d =>
          d.todos.unshift({
            task: '',
            done: false
          })
        );
      }}>
        New todo item
      </button>

      {doc && doc.todos?.map(({ task, done }, index) =>
        <div className='task' key={index}>
          <input
            type="checkbox"
            checked={done}
            onChange={() => changeDoc(d => {
              d.todos[index].done = !d.todos[index].done;
            })}
          />

          <input type="text" placeholder='What needs doing?' value={task || ''}
            onChange={(e) => changeDoc(d => {
              d.todos[index].task = e.target.value;
            })} />
        </div>)
      }



      <footer>
        <p className="read-the-docs">Powered by Automerge and Vite + React + TypeScript
        </p>
      </footer>
    </>
  )
}

export default App
