import automergeLogo from '/automerge.png'
import './App.css'
import { isValidAutomergeUrl, type AutomergeUrl, } from '@automerge/automerge-repo'
import { useDocument, useRepo } from '@automerge/automerge-repo-react-hooks'


interface TodoDoc {
  task: string;
  done: boolean;
}

interface ListDoc {
  todoUrls: AutomergeUrl[];
}


function TodoItem({ docUrl }: { docUrl: AutomergeUrl }) {

  const [doc, changeDoc] = useDocument<TodoDoc>(docUrl)

  return (<div className="task" >

    {doc ? (<>
      <input
        type="checkbox"
        checked={doc.done === undefined ? false : doc.done}
        onChange={() => changeDoc(d => d.done = !d.done)}
        style={{ textDecoration: 'line-through' }} />

      <input type="text" placeholder='Learn Automerge' value={doc.task || ''} onChange={(e) => changeDoc(d => d.task = e.target.value)} />
    </>
    ) : (
      <p>Loading...</p>
    )}

  </div>
  )
};


function App({ }) {
  const repo = useRepo();

  const rootDocUrl = `${document.location.hash.substring(1)}`
  let handle
  if (isValidAutomergeUrl(rootDocUrl)) {
    handle = repo.find(rootDocUrl)
  } else {
    handle = repo.create<ListDoc>()
    handle.change(d => d.todoUrls = [])
  }
  const docUrl = document.location.hash = handle.url

  const [listDoc, changeListDoc] = useDocument<ListDoc>(docUrl)


  console.log(listDoc);

  return (
    <>
      <header>
        <h1>Shared Task List</h1>
      </header>


      <button type="button" onClick={() => {
        const newTodo = repo.create<TodoDoc>();
        changeListDoc(d => d.todoUrls = d.todoUrls
          ? [newTodo.url, ...d.todoUrls,]
          : [newTodo.url]
        );
      }}>
        New todo item
      </button>

      {listDoc && listDoc.todoUrls?.map(docUrl =>
        <TodoItem key={docUrl} docUrl={docUrl} />)}



      <footer>
        <p>Powered by Automerge and Vite + React + TypeScript
        </p>
      </footer>
    </>
  )
}

export default App
