import React, { useRef, useEffect } from 'react';
import { MessageItem } from './MessageItem';
import { Bot } from 'lucide-react';
import { Message, ContextModalData } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  onInspectContext: (data: ContextModalData) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, loading, onInspectContext }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          onInspectContext={onInspectContext}
        />
      ))}

      {/* Typing / Loading indicator */}
      {loading && (
        <div className="flex items-start space-x-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-md">
            <Bot className="w-4 h-4 animate-pulse" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-300 rounded-tl-none flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-slate-400 font-medium">Retrieving vectors &amp; generating answer...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
