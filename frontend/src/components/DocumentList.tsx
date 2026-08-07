import React from 'react';
import { FileText, Trash2, Layers, HardDrive } from 'lucide-react';
import { DocumentInfo } from '../types/document';
import { formatBytes } from '../utils/formatters';

interface DocumentListProps {
  documents: DocumentInfo[];
  onDelete: (filename: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-800/20 border border-dashed border-slate-700 text-center">
        <FileText className="w-8 h-8 mx-auto text-slate-500 mb-2" />
        <p className="text-xs text-slate-400 font-medium">No documents indexed yet</p>
        <p className="text-[11px] text-slate-500 mt-1">Upload PDF, TXT, or MD files to build your knowledge base.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
      {documents.map((doc, idx) => (
        <div
          key={idx}
          className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <FileText className="w-4 h-4 flex-shrink-0" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate" title={doc.filename}>
                {doc.filename}
              </p>
              <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-0.5">
                <span className="flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-purple-400" />
                  <span>{doc.chunk_count} chunks</span>
                </span>
                <span className="flex items-center space-x-1">
                  <HardDrive className="w-3 h-3 text-cyan-400" />
                  <span>{formatBytes(doc.size_bytes)}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDelete(doc.filename)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            title="Delete Document &amp; Re-index"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
