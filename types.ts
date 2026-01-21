//constants.ts & types.ts: Define the underlying data structures
//(the "source of truth") for the visualizations and ensure the code is type-safe.

export interface MarketData {
  year: number;
  marketSize: number;
  skinEconomy: number;
  digitalFashion: number;
}

export interface EconomyNode {
  id: string;
  group: string;
  value: number;
  label: string;
}

export interface InsightRequest {
  topic: string;
  context: string;
}

export interface TrendResponse {
  trend: string;
  analysis: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}
