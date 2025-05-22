import React, { useEffect } from "react";
import { useRepo, useDocument, AutomergeUrl } from "@automerge/react";
import { initTaskList, TaskList } from "./TaskList";

export interface DocumentList {
  documents: AutomergeUrl[];
}

// A helper function to consistently initialize the document list.
export const initDocumentList = (initialDocUrls: AutomergeUrl[]) => {
  return {
    documents: initialDocUrls || [],
  };
};

export const DocumentList: React.FC<{
  docUrl: AutomergeUrl;
  selectedDocument: AutomergeUrl | undefined;
  onSelectDocument: (doc: AutomergeUrl) => void;
}> = ({ docUrl, selectedDocument, onSelectDocument }) => {
  const repo = useRepo();
  const [doc, changeDoc] = useDocument<DocumentList>(docUrl, {
    suspense: true,
  });

  // Record the selectedDocument in the list if it's not already there
  useEffect(() => {
    changeDoc((doc: DocumentList) => {
      if (selectedDocument && !doc.documents.includes(selectedDocument)) {
        doc.documents.push(selectedDocument);
      }
    });
  }, [selectedDocument, changeDoc]);

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
              docUrl === selectedDocument ? "active" : ""
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
// We could have used useDocuments instead here, but this works too.
const DocumentTitle: React.FC<{ docUrl: AutomergeUrl }> = ({ docUrl }) => {
  const [doc] = useDocument<TaskList>(docUrl, { suspense: true });

  // Get the first task's title or use a default
  const title = doc.title || "Untitled Task List";
  return <div>{title}</div>;
};
