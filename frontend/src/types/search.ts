export interface SearchResult {
  document: string;
  metadata: {
    filename: string;
  };
  distance: number;
}