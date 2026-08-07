import React, { useState } from 'react';
import { Send, Sparkles, Paperclip } from 'lucide-react';
import { MessageList } from './MessageList';

const PRESET_QUESTIONS = [
  'What documents are currently indexed in the knowledge base?',
  'Summarize the core topics covered in the uploaded files.',
  'What is the chunk size and overlap configuration used for vector search?',
];

export const ChatArea = ({
  messages,
  loading,
  onSendMessage,
  onOpenUpload,
  onInspectContext,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input);
    setInput('');
  };

  const handlePresetClick = (q) => {
    onSendMessage(q);
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-900/50 dark:bg-slate-900/50 light:bg-white relative">
      {/* Message Feed */}
      <MessageList
        messages={messages}
        loading={loading}
        onInspectContext={onInspectContext}
      />

      {/* Preset Prompt Chips (Show if messages list is short) */}
      {messages.length <= 2 && !loading && (
        <div className="px-6 mb-2 flex flex-wrap gap-2 justify-center">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(q)}
              className="py-1.5 px-3 rounded-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      )}

      {/* Floating Input Box */}
      <div className="p-4 md:p-6 border-t border-slate-800/60 bg-slate-900/90 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
          <button
            type="button"
            onClick={onOpenUpload}
            className="absolute left-3 p-2 text-slate-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-800"
            title="Upload document"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your uploaded documents..."
            disabled={loading}
            className="w-full pl-12 pr-14 py-3.5 bg-slate-800/80 border border-slate-700/70 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 rounded-2xl text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2.5 p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 text-center mt-2">
          Responses are grounded strictly in uploaded documents retrieved via ChromaDB vector similarity.
        </p>
      </div>
    </main>
  );
};
