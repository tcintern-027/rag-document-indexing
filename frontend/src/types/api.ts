export interface HealthResponse {
  status: string;
  vector_count: number;
  chroma_db_status: string;
  llm_model: string;
}

export interface APIErrorResponse {
  detail?: string | { msg: string }[];
}
