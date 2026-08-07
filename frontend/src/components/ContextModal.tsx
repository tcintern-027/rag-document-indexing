import React, { useState } from 'react';
import { X, Layers, FileText, Copy, Check } from 'lucide-react';
import { ContextModalData } from '../types/chat';

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: ContextModalData | null;
}

export const ContextModal: React.FC<ContextModalProps> = ({ isOpen, onClose, contextData }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen || !contextData) return null;

  const { chunks = [], question = '' } = contextData;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[85vh] p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Retrieved Context Chunks</h2>
              <p className="text-xs text-slate-400">Inspecting raw vector search matches from ChromaDB</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Question context */}
        {question && (
          <div className="my-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
            <span className="text-slate-400 font-medium">Query: </span>
            <span className="text-indigo-300 font-semibold">"{question}"</span>
          </div>
        )}

        {/* Chunks scrollable list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 my-2">
          {chunks.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No context chunks retrieved for this prompt.</p>
          ) : (
            chunks.map((chunk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-bold">
                      Chunk #{chunk.id || idx + 1}
                    </span>
                    <span className="flex items-center space-x-1 text-xs text-slate-300 font-medium">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{chunk.source}</span>
                    </span>
                    {chunk.page && (
                      <span className="text-[10px] text-slate-400">(Page {chunk.page})</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleCopy(chunk.content, idx)}
                    className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed border border-slate-800">
                  {chunk.content}
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
