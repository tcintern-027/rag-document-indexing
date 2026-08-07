import React from 'react';
import { Database, FileText, Cpu, CheckCircle2 } from 'lucide-react';

interface StatsCardProps {
  vectorCount: number;
  documentCount: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ vectorCount, documentCount }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-800/40 rounded-xl border border-slate-700/40">
      <div className="flex items-center space-x-2.5">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-semibold text-slate-400">Chroma Vectors</p>
          <p className="text-sm font-bold text-slate-200">{vectorCount}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-semibold text-slate-400">Documents</p>
          <p className="text-sm font-bold text-slate-200">{documentCount}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-semibold text-slate-400">Groq LLM</p>
          <p className="text-xs font-semibold text-slate-300">Llama 3.3 70B</p>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-semibold text-slate-400">RAG Engine</p>
          <p className="text-xs font-semibold text-emerald-400">Grounded</p>
        </div>
      </div>
    </div>
  );
};
