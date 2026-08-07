import { useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { Message, ContextModalData } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      type: 'assistant',
      content: 'Hello! I am your AI Knowledge Assistant. Upload documents (PDF, TXT, MD) and ask questions to explore grounded answers backed by source citations.',
      timestamp: new Date().toISOString(),
      sources: [],
      chunks: [],
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [topK, setTopK] = useState<number>(3);
  const [selectedContextModal, setSelectedContextModal] = useState<ContextModalData | null>(null);

  const sendMessage = useCallback(async (questionText: string) => {
    if (!questionText || !questionText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: questionText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.sendChatQuery(questionText.trim(), topK);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: response.answer,
        sources: response.sources || [],
        chunks: response.chunks || [],
        metadata: response.metadata || {},
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Failed to send message:', err);
      const errMsg: string = err.response?.data?.detail || err.message || 'Error processing request.';
      setError(errMsg);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          type: 'assistant',
          content: `⚠️ Error: ${errMsg}. Please ensure the backend server is running and your GROQ_API_KEY is configured correctly.`,
          isError: true,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [topK]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome-msg',
        type: 'assistant',
        content: 'Chat history cleared. How can I assist you with your knowledge base?',
        timestamp: new Date().toISOString(),
        sources: [],
        chunks: [],
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    topK,
    setTopK,
    sendMessage,
    clearChat,
    selectedContextModal,
    setSelectedContextModal,
  };
};
