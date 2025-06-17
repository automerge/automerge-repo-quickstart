import React from "react";
import { useDocument, AutomergeUrl } from "@automerge/react";
import { TaskList } from "./TaskList";

import { RootDocument } from "../rootDoc";

export const DocumentList: React.FC<{
  docUrl: AutomergeUrl;
  selectedDocument: AutomergeUrl | null;
  onSelectDocument: (docUrl: AutomergeUrl | null) => void;
}> = ({ docUrl, selectedDocument, onSelectDocument }) => {
  const [doc] = useDocument<RootDocument>(docUrl, {
    suspense: true,
  });

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
