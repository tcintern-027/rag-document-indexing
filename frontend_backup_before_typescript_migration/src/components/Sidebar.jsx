import React from 'react';
import { Upload, Trash2, Sliders, FileText, Database, ShieldCheck, RefreshCw } from 'lucide-react';
import { DocumentList } from './DocumentList';
import { StatsCard } from './StatsCard';

export const Sidebar = ({
  documents,
  vectorCount,
  topK,
  setTopK,
  onOpenUpload,
  onDeleteDocument,
  onClearChat,
  onRefresh,
}) => {
  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900/95 flex flex-col h-[calc(100vh-4rem)] sticky top-16 text-slate-200 dark:bg-slate-900/95 dark:border-slate-800 light:bg-slate-50 light:border-slate-200">
      {/* Top Action Header */}
      <div className="p-4 border-b border-slate-800 space-y-3">
        <button
          onClick={onOpenUpload}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Document</span>
        </button>

        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          <span>Knowledge Base</span>
          <button
            onClick={onRefresh}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Ingested Docs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Middle Scrollable Section: Document List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <DocumentList documents={documents} onDelete={onDeleteDocument} />

        {/* Top-K Retrieval Parameter Slider */}
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Top-K Search Chunks</span>
            </label>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
              {topK}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <p className="text-[10px] text-slate-400">
            Controls how many relevant chunks ChromaDB retrieves per question.
          </p>
        </div>

        {/* Vector DB Telemetry Stats */}
        <StatsCard vectorCount={vectorCount} documentCount={documents.length} />
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onClearChat}
          className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/50 flex items-center justify-center space-x-2 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Clear Chat History</span>
        </button>
      </div>
    </aside>
  );
};
