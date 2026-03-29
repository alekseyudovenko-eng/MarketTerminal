import { useState, useEffect, useCallback } from 'react';
import { 
  fetchLivePrices, 
  fetchLiveNews, 
  generateAIAnalysis,
  convertToPriceQuotes,
  convertToMarketNews,
  type LivePriceData,
  type LiveNewsItem 
} from '@/services/apiService';
import type { PriceQuote, MarketNews } from '@/types/market';

interface UseLiveDataReturn {
  prices: PriceQuote[];
  news: MarketNews[];
  aiAnalysis: string | null;
  isLoading: boolean;
  isGeneratingReport: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  generateReport: () => Promise<void>;
}

export function useLiveData(): UseLiveDataReturn {
  const [prices, setPrices] = useState<PriceQuote[]>([]);
  const [news, setNews] = useState<MarketNews[]>([]);
  const [rawPrices, setRawPrices] = useState<LivePriceData[]>([]);
  const [rawNews, setRawNews] = useState<LiveNewsItem[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch prices and news in parallel
      const [pricesData, newsData] = await Promise.all([
        fetchLivePrices(),
        fetchLiveNews()
      ]);

      setRawPrices(pricesData);
      setRawNews(newsData.news);
      setPrices(convertToPriceQuotes(pricesData));
      setNews(convertToMarketNews(newsData.news));
      setLastUpdated(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
      console.error('useLiveData error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateReport = useCallback(async () => {
    if (rawPrices.length === 0 && rawNews.length === 0) {
      setError('No data available for analysis');
      return;
    }

    setIsGeneratingReport(true);
    setError(null);

    try {
      const response = await generateAIAnalysis(rawPrices, rawNews);
      setAiAnalysis(response.analysis);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate analysis';
      setError(message);
      console.error('generateReport error:', err);
    } finally {
      setIsGeneratingReport(false);
    }
  }, [rawPrices, rawNews]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    prices,
    news,
    aiAnalysis,
    isLoading,
    isGeneratingReport,
    error,
    lastUpdated,
    refresh: fetchData,
    generateReport
  };
}
