import axios from 'axios';
import { ChatResponse } from '../types/chat';
import { DocumentListResponse, UploadResponse, DocumentDeleteResponse } from '../types/document';
import { HealthResponse } from '../types/api';

const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const apiService = {
  // Check health and telemetry
  getHealth: async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  },

  // Query RAG chatbot
  sendChatQuery: async (question: string, topK: number | null = null): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>('/chat', {
      question,
      top_k: topK,
    });
    return response.data;
  },

  // Upload document file
  uploadDocument: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // List ingested documents
  getDocuments: async (): Promise<DocumentListResponse> => {
    const response = await apiClient.get<DocumentListResponse>('/documents');
    return response.data;
  },

  // Delete document file
  deleteDocument: async (filename: string): Promise<DocumentDeleteResponse> => {
    const response = await apiClient.delete<DocumentDeleteResponse>(`/documents/${encodeURIComponent(filename)}`);
    return response.data;
  },
};
