import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ChatArea } from '../components/ChatArea';
import { UploadModal } from '../components/UploadModal';
import { ContextModal } from '../components/ContextModal';
import { useChat } from '../hooks/useChat';
import { useUpload } from '../hooks/useUpload';

export const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  const {
    messages,
    loading,
    topK,
    setTopK,
    sendMessage,
    clearChat,
    selectedContextModal,
    setSelectedContextModal,
  } = useChat();

  const {
    documents,
    totalChunks,
    uploading,
    uploadProgress,
    uploadFile,
    deleteDocument,
    refreshDocuments,
  } = useUpload();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'light bg-slate-50 text-slate-900'}`}>
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        documentCount={documents.length}
        vectorCount={totalChunks}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          documents={documents}
          vectorCount={totalChunks}
          topK={topK}
          setTopK={setTopK}
          onOpenUpload={() => setIsUploadOpen(true)}
          onDeleteDocument={deleteDocument}
          onClearChat={clearChat}
          onRefresh={refreshDocuments}
        />

        {/* Center Chat Area */}
        <ChatArea
          messages={messages}
          loading={loading}
          onSendMessage={sendMessage}
          onOpenUpload={() => setIsUploadOpen(true)}
          onInspectContext={(data) => setSelectedContextModal(data)}
        />
      </div>

      {/* Upload Document Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={uploadFile}
        uploading={uploading}
        uploadProgress={uploadProgress}
      />

      {/* Context Inspection Modal */}
      <ContextModal
        isOpen={!!selectedContextModal}
        onClose={() => setSelectedContextModal(null)}
        contextData={selectedContextModal}
      />
    </div>
  );
};
