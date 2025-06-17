import React from "react";
import { useDocument, AutomergeUrl, useRepo } from "@automerge/react";
import { initTaskList, TaskList } from "./TaskList";

import { RootDocument } from "../rootDoc";
import { useEffect } from "react";

export const DocumentList: React.FC<{
  docUrl: AutomergeUrl;
  selectedDocument: AutomergeUrl | null;
  onSelectDocument: (docUrl: AutomergeUrl | null) => void;
}> = ({ docUrl, selectedDocument, onSelectDocument }) => {
  const repo = useRepo();
  const [doc, changeDoc] = useDocument<RootDocument>(docUrl, {
    suspense: true,
  });

  useEffect(() => {
    changeDoc((d) => {
      if (selectedDocument && !d.taskLists.includes(selectedDocument)) {
        // If the selected document is not in the list, add it
        d.taskLists.push(selectedDocument);
      }
    });
  }, [selectedDocument, changeDoc]);

  const handleNewDocument = () => {
    const newTaskList = repo.create<TaskList>(initTaskList());
    changeDoc((d) => d.taskLists.push(newTaskList.url));
    onSelectDocument(newTaskList.url);
  };

  return (
    <div className="document-list">
      <div className="documents">
        {doc.taskLists.map((docUrl) => (
          <div
            key={docUrl}
            className={`document-item ${docUrl === selectedDocument ? "active" : ""}`}
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
