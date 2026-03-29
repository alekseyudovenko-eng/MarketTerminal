// Frontend API Service
// Calls Vercel Serverless Functions

import type { PriceQuote, MarketNews } from '@/types/market';

const API_BASE = import.meta.env.VITE_API_URL || '';

export interface LivePriceData {
  commodity: string;
  price: string;
  source: string;
  snippet: string;
  extractedAt: string;
}

export interface LiveNewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
}

export interface AIAnalysisResponse {
  success: boolean;
  timestamp: string;
  analysis: string;
  model: string;
}

// Fetch live prices from Serper API
export async function fetchLivePrices(): Promise<LivePriceData[]> {
  try {
    const response = await fetch(`${API_BASE}/api/prices`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching live prices:', error);
    throw error;
  }
}

// Fetch live news from Tavily API
export async function fetchLiveNews(): Promise<{ news: LiveNewsItem[]; answer?: string }> {
  try {
    const response = await fetch(`${API_BASE}/api/news`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      news: data.news || [],
      answer: data.answer
    };
  } catch (error) {
    console.error('Error fetching live news:', error);
    throw error;
  }
}

// Generate AI analysis
export async function generateAIAnalysis(
  prices: LivePriceData[],
  news: LiveNewsItem[]
): Promise<AIAnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/ai-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prices, news })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    throw error;
  }
}

// Convert live price data to PriceQuote format
export function convertToPriceQuotes(liveData: LivePriceData[]): PriceQuote[] {
  return liveData.map((item, index) => {
    // Parse price value
    const priceMatch = item.price?.match(/[\d,]+(?:\.\d+)?/);
    const price = priceMatch ? parseFloat(priceMatch[0].replace(',', '')) : 0;
    
    // Determine origin based on commodity and context
    const origin = item.snippet?.includes('Black Sea') ? 'Black Sea' :
                   item.snippet?.includes('Ukraine') ? 'Ukraine' :
                   item.snippet?.includes('Russia') ? 'Russia' :
                   item.snippet?.includes('Malaysia') ? 'Malaysia' :
                   item.snippet?.includes('Argentina') ? 'Argentina' :
                   item.snippet?.includes('Brazil') ? 'Brazil' :
                   item.snippet?.includes('Rotterdam') ? 'Rotterdam' :
                   'Global';
    
    return {
      id: `live-${index}`,
      commodity: item.commodity,
      origin,
      price,
      currency: 'USD',
      unit: 'mt',
      basis: 'FOB',
      change: 0, // Would need historical data for this
      changePercent: 0,
      date: new Date().toISOString().split('T')[0],
      forward: 'Spot'
    };
  });
}

// Convert live news to MarketNews format
export function convertToMarketNews(liveData: LiveNewsItem[]): MarketNews[] {
  return liveData.map(item => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    source: item.source,
    category: item.category as 'prices' | 'trade' | 'policy' | 'logistics' | 'production',
    region: 'Global',
    publishedAt: item.publishedAt,
    url: item.url
  }));
}
