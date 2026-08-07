import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, FileText, Eye } from 'lucide-react';
import { SourceCitation, RetrievedChunk, ContextModalData } from '../types/chat';

interface SourceCitationsProps {
  sources?: SourceCitation[];
  chunks?: RetrievedChunk[];
  onInspectContext: (data: ContextModalData) => void;
  question?: string;
}

export const SourceCitations: React.FC<SourceCitationsProps> = ({
  sources = [],
  chunks = [],
  onInspectContext,
  question = '',
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-slate-700/40">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{sources.length} Grounded Source Citation{sources.length > 1 ? 's' : ''}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {chunks && chunks.length > 0 && (
          <button
            onClick={() => onInspectContext({ chunks, question })}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[11px] font-medium transition-colors border border-indigo-500/20"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Retained Context</span>
          </button>
        )}
      </div>

      {/* Expandable Citations List */}
      {expanded && (
        <div className="mt-2.5 space-y-2">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{src.source}</span>
                </span>
                {src.page && (
                  <span className="text-[10px] text-slate-400 font-mono">Page {src.page}</span>
                )}
              </div>
              {src.snippet && (
                <p className="text-[11px] text-slate-400 italic line-clamp-2 pl-5">
                  "{src.snippet}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
