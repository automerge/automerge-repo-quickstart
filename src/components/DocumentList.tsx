import React, { useEffect } from "react";
import { useRepo, useDocument, AutomergeUrl } from "@automerge/react";

export interface DocumentList {
  taskLists: AutomergeUrl[];
}

export const DocumentList: React.FC<{
  docUrl: AutomergeUrl;
}> = ({ docUrl, selectedDocument, onSelectDocument }) => {
  const repo = useRepo();
  const [doc, changeDoc] = useDocument<DocumentList>(docUrl, {
    suspense: true,
  });

  return (
    <div className="document-list">
      <div className="documents">
        {doc.taskLists.map((docUrl) => (
          <div
            key={docUrl}
            className={`document-item ${
          >
            <DocumentTitle docUrl={docUrl} />
          </div>
        ))}
  );
};

// Component to display document title
const DocumentTitle: React.FC<{ docUrl: AutomergeUrl }> = ({ docUrl }) => {
  const [doc] = useDocument<TaskList>(docUrl, { suspense: true });

  // Get the first task's title or use a default
  const title = doc.title || "Untitled Task List";
  return <div>{title}</div>;
};
