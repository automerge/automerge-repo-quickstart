import React, { useState, useEffect } from "react";
import {
  useRepo,
  useDocument,
  AutomergeUrl,
  isValidAutomergeUrl,
} from "@automerge/react";
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
  onSelectDocument: (doc: AutomergeUrl) => void;
}> = ({ docUrl, onSelectDocument }) => {
  const repo = useRepo();
  const [doc, changeDoc] = useDocument<DocumentList>(docUrl, {
    suspense: true,
  });

  // Get initial document from hash or first in list
  const hash = window.location.hash.slice(1);
  let initialDoc: AutomergeUrl;

  if (hash && isValidAutomergeUrl(hash)) {
    // Try to find the document in our list
    const existingDoc = doc.documents.find((d) => d.toString() === hash);
    if (existingDoc) {
      initialDoc = existingDoc;
    } else {
      // If not found, add it to our list
      changeDoc((doc: DocumentList) => {
        if (!doc.documents.some((d) => d.toString() === hash)) {
          doc.documents.push(hash as AutomergeUrl);
        }
      });
      initialDoc = hash as AutomergeUrl;
    }
  } else {
    initialDoc = doc.documents[0];
  }

  const [currentDocument, setCurrentDocument] =
    useState<AutomergeUrl>(initialDoc);

  // Notify parent of initial document selection
  useEffect(() => {
    onSelectDocument(initialDoc);
  }, []);

  // Update hash when document changes
  useEffect(() => {
    window.location.hash = currentDocument.toString();
  }, [currentDocument]);

  const handleNewDocument = () => {
    // Create a new empty task list
    const taskListHandle = repo.create(initTaskList());

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
