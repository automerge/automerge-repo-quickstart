import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import * as A from "@automerge/automerge"

import './index.css'
import { isValidAutomergeUrl, Repo, DocHandle } from '@automerge/automerge-repo'
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { RepoContext } from '@automerge/automerge-repo-react-hooks'

const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
})

declare global {
  interface Window {
    handle: DocHandle<unknown>
  }
}

const rootDocUrl = `${document.location.hash.substring(1)}`
let handle
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl)
} else {
  handle = repo.create<{ counter?: A.Counter }>()
  handle.change(d => d.counter = new A.Counter())
}
const docUrl = document.location.hash = handle.url
window.handle = handle // we'll use this later for experimentation

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App docUrl={docUrl} />
    </RepoContext.Provider>
  </React.StrictMode>,
)
