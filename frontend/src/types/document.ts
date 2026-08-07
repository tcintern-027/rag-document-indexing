export interface DocumentInfo {
  filename: string;
  chunk_count: number;
  size_bytes: number;
}

export interface DocumentListResponse {
  documents: DocumentInfo[];
  total_documents: number;
  total_chunks: number;
}

export interface UploadResponse {
  filename: string;
  status: 'success' | 'error';
  chunks_created: number;
  total_vectors: number;
  message: string;
}

export interface DocumentDeleteResponse {
  message: string;
  remaining_documents: number;
  total_vectors: number;
}

export interface DocumentStats {
  vectorCount: number;
  documentCount: number;
}
