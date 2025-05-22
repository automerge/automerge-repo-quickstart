import React, { useEffect } from "react";
import { useRepo, useDocument, AutomergeUrl } from "@automerge/react";
import { initTaskList, TaskList } from "./TaskList";
import "./DocumentList.css";

export interface DocumentList {
  documents: AutomergeUrl[];
}

export const initDocumentList = (initialDocUrls: AutomergeUrl[]) => {
  return {
    documents: initialDocUrls || [],
  };
};

export const DocumentList: React.FC<{
  docUrl: AutomergeUrl;
  currentDocument: AutomergeUrl | undefined;
  onSelectDocument: (doc: AutomergeUrl) => void;
}> = ({ docUrl, currentDocument, onSelectDocument }) => {
  const repo = useRepo();
  const [doc, changeDoc] = useDocument<DocumentList>(docUrl, {
    suspense: true,
  });

  // Add currentDocument to list if it's not already there
  useEffect(() => {
    if (currentDocument && !doc.documents.some((d) => d === currentDocument)) {
      changeDoc((doc: DocumentList) => {
        doc.documents.push(currentDocument);
      });
    }
  }, [currentDocument, doc.documents]);

  const handleNewDocument = () => {
    // Create a new empty task list
    const taskListHandle = repo.create(initTaskList());
    onSelectDocument(taskListHandle.url);
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
            onClick={() => onSelectDocument(docUrl)}
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
