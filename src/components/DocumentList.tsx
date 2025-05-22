import React from "react";
import { useRepo, useDocument, AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";

export interface DocumentList {
  documents: AutomergeUrl[];
}

export const DocumentList: React.FC<{
  docUrl: AutomergeUrl;
  onSelectDocument: (doc: AutomergeUrl) => void;
}> = ({ docUrl, onSelectDocument }) => {
  const repo = useRepo();
  const [doc, changeDoc] = useDocument<DocumentList>(docUrl, {
    suspense: true,
  });

  const handleNewDocument = () => {
    // Create a new empty task list
    const taskListHandle = repo.create({ tasks: [] });

    // Add it to the listing, here
    changeDoc((doc: DocumentList) => {
      doc.documents.push(taskListHandle.url);
    });

    // Select the new document
    onSelectDocument(taskListHandle.url);
  };

  return (
    <div className="document-list">
      <button onClick={handleNewDocument}>New Task List</button>
      <div className="documents">
        {doc.documents.map((docUrl) => (
          <div
            key={docUrl}
            className="document-item"
            onClick={() => onSelectDocument(docUrl)}
          >
            <DocumentTitle docUrl={docUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Component to display document title
const DocumentTitle: React.FC<{ docUrl: AutomergeUrl }> = ({ docUrl }) => {
  const [doc] = useDocument<TaskList>(docUrl, { suspense: true });

  // Get the first task's title or use a default
  const title = doc.title || "Untitled Task List";
  return <div>{title}</div>;
};
