import React, { useState } from 'react';
import { User, Bot, Copy, Check, AlertTriangle } from 'lucide-react';
import { SourceCitations } from './SourceCitations';
import { formatTime } from '../utils/formatters';

export const MessageItem = ({ message, onInspectContext }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.type === 'user';
  const isError = message.isError;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
        isUser
          ? 'bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white'
          : isError
          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
      }`}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : isError ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content Container */}
      <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
        isUser
          ? 'bg-indigo-600 text-white rounded-tr-none'
          : isError
          ? 'bg-rose-500/10 border border-rose-500/30 text-rose-200 rounded-tl-none'
          : 'bg-slate-800/80 border border-slate-700/60 text-slate-100 rounded-tl-none dark:bg-slate-800/80 dark:border-slate-700/60 light:bg-white light:border-slate-200 light:text-slate-800'
      }`}>
        {/* Header bar */}
        <div className="flex items-center justify-between mb-1 text-[11px] opacity-70">
          <span className="font-semibold">{isUser ? 'You' : 'AI Assistant'}</span>
          <span className="ml-2 font-mono">{formatTime(message.timestamp)}</span>
        </div>

        {/* Text Body */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {message.content}
        </div>

        {/* Source Citations & Inspection Drawer trigger for Assistant messages */}
        {!isUser && !isError && (
          <SourceCitations
            sources={message.sources}
            chunks={message.chunks}
            question={message.metadata?.question || ''}
            onInspectContext={onInspectContext}
          />
        )}

        {/* Copy Button */}
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg text-xs opacity-60 hover:opacity-100 hover:bg-slate-700/40 transition-all flex items-center space-x-1"
            title="Copy response text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
