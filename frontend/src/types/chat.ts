export interface SourceCitation {
  source: string;
  page?: number | null;
  snippet: string;
}

export interface RetrievedChunk {
  id: number;
  content: string;
  source: string;
  page?: number | null;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: SourceCitation[];
  chunks?: RetrievedChunk[];
  metadata?: Record<string, any>;
  isError?: boolean;
}

export interface ChatRequest {
  question: string;
  top_k?: number | null;
}

export interface ChatResponse {
  answer: string;
  sources: SourceCitation[];
  chunks: RetrievedChunk[];
  metadata: Record<string, any>;
}

export interface ContextModalData {
  chunks: RetrievedChunk[];
  question: string;
}
