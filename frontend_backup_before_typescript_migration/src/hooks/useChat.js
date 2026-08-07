import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      type: 'assistant',
      content: 'Hello! I am your AI Knowledge Assistant. Upload documents (PDF, TXT, MD) and ask questions to explore grounded answers backed by source citations.',
      timestamp: new Date().toISOString(),
      sources: [],
      chunks: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topK, setTopK] = useState(3);
  const [selectedContextModal, setSelectedContextModal] = useState(null);

  const sendMessage = useCallback(async (questionText) => {
    if (!questionText || !questionText.trim()) return;

    const userMessage = {
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

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: response.answer,
        sources: response.sources || [],
        chunks: response.chunks || [],
        metadata: response.metadata || {},
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      const errMsg = err.response?.data?.detail || err.message || 'Error processing request.';
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
