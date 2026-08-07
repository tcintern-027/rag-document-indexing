import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';

export const useUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [totalChunks, setTotalChunks] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    try {
      const data = await apiService.getDocuments();
      setDocuments(data.documents || []);
      setTotalChunks(data.total_chunks || 0);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadFile = useCallback(async (file) => {
    setUploading(true);
    setUploadProgress(`Uploading and indexing '${file.name}'...`);
    setError(null);

    try {
      const result = await apiService.uploadDocument(file);
      await fetchDocuments();
      setUploadProgress(null);
      return result;
    } catch (err) {
      console.error('Upload failed:', err);
      const errMsg = err.response?.data?.detail || err.message || 'File upload failed.';
      setError(errMsg);
      setUploadProgress(null);
      throw new Error(errMsg);
    } finally {
      setUploading(false);
    }
  }, [fetchDocuments]);

  const deleteDocument = useCallback(async (filename) => {
    try {
      await apiService.deleteDocument(filename);
      await fetchDocuments();
    } catch (err) {
      console.error('Delete document failed:', err);
      setError(err.response?.data?.detail || 'Failed to remove document.');
    }
  }, [fetchDocuments]);

  return {
    documents,
    totalChunks,
    uploading,
    uploadProgress,
    error,
    uploadFile,
    deleteDocument,
    refreshDocuments: fetchDocuments,
  };
};
