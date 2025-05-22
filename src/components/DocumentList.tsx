import React, { useState } from "react";
import { useRepo, useDocument, AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";
import "./DocumentList.css";

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
  const [currentDocument, setCurrentDocument] = useState<AutomergeUrl>(
    doc.documents[0]
  );

  const handleNewDocument = () => {
    // Create a new empty task list
    const taskListHandle = repo.create({ tasks: [] });

    // Add it to the listing, here
    changeDoc((doc: DocumentList) => {
      doc.documents.push(taskListHandle.url);
    });

    // Select the new document
    setCurrentDocument(taskListHandle.url);
    onSelectDocument(taskListHandle.url);
  };

  const handleSelectDocument = (docUrl: AutomergeUrl) => {
    setCurrentDocument(docUrl);
    onSelectDocument(docUrl);
  };

  return (
    <div className="document-list">
      <div className="documents">
        {doc.documents.map((docUrl) => (
          <div
            key={docUrl}
            className={`document-item ${
              docUrl === currentDocument ? "active" : ""
            }`}
            onClick={() => handleSelectDocument(docUrl)}
          >
            <DocumentTitle docUrl={docUrl} />
          </div>
        ))}
      </div>
      <button onClick={handleNewDocument}>+ Task List</button>
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
