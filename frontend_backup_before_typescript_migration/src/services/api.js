import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout for LLM generation
});

export const apiService = {
  // Check health and telemetry
  getHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },

  // Query RAG chatbot
  sendChatQuery: async (question, topK = null) => {
    const response = await apiClient.post('/chat', {
      question,
      top_k: topK,
    });
    return response.data;
  },

  // Upload document file
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // List ingested documents
  getDocuments: async () => {
    const response = await apiClient.get('/documents');
    return response.data;
  },

  // Delete document file
  deleteDocument: async (filename) => {
    const response = await apiClient.delete(`/documents/${encodeURIComponent(filename)}`);
    return response.data;
  },
};
