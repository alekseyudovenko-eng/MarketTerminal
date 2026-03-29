// Types for Vegetable Oils & Fats Market Terminal

export interface PriceQuote {
  id: string;
  commodity: string;
  origin: string;
  price: number;
  currency: string;
  unit: string;
  basis: 'FOB' | 'CIF' | 'CPT' | 'EXW' | 'CFR';
  change: number;
  changePercent: number;
  date: string;
  forward?: string;
}

export interface Spread {
  id: string;
  name: string;
  commodity1: string;
  commodity2: string;
  spreadValue: number;
  change: number;
  date: string;
}

export interface Duty {
  id: string;
  country: string;
  product: string;
  dutyAmount: number;
  currency: string;
  unit: string;
  effectiveDate: string;
  previousAmount?: number | null;
  changePercent?: number | null;
  basePrice?: number | null;
  indicativePrice?: number | null;
  notes?: string;
}

export interface LogisticsItem {
  id: string;
  type: 'port' | 'border' | 'route';
  location: string;
  status: 'normal' | 'congested' | 'delayed' | 'blocked';
  description: string;
  impact: 'low' | 'medium' | 'high';
  updatedAt: string;
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: 'prices' | 'trade' | 'policy' | 'logistics' | 'production';
  region: string;
  publishedAt: string;
  url?: string;
}

export interface TradeFlow {
  id: string;
  exporter: string;
  importer: string;
  product: string;
  volume: number;
  unit: string;
  period: string;
  changeYoY?: number | null;
}

export interface ProductionData {
  id: string;
  country: string;
  product: string;
  volume: number;
  unit: string;
  season: string;
  forecast?: number | null;
  changeYoY?: number | null;
}

export interface AIReport {
  id: string;
  title: string;
  content: string;
  summary: string;
  keyPoints: string[];
  generatedAt: string;
  category: 'market' | 'price' | 'trade' | 'policy' | 'comprehensive';
}

export type TerminalTab = 'prices' | 'spreads' | 'trade' | 'duties' | 'logistics' | 'news' | 'report';

export interface CommodityConfig {
  id: string;
  name: string;
  code: string;
  category: 'oil' | 'fat' | 'meal' | 'seed';
  icon?: string;
}

export const COMMODITIES: CommodityConfig[] = [
  { id: '1', name: 'Sunflower Oil', code: 'SFO', category: 'oil' },
  { id: '2', name: 'Palm Oil (CPO)', code: 'CPO', category: 'oil' },
  { id: '3', name: 'RBD Palm Olein', code: 'RBDPO', category: 'oil' },
  { id: '4', name: 'Soybean Oil', code: 'SBO', category: 'oil' },
  { id: '5', name: 'Rapeseed Oil', code: 'RSO', category: 'oil' },
  { id: '6', name: 'Palm Kernel Oil', code: 'PKO', category: 'oil' },
  { id: '7', name: 'Coconut Oil', code: 'CNO', category: 'oil' },
  { id: '8', name: 'Sunflower Meal', code: 'SFM', category: 'meal' },
  { id: '9', name: 'Soybean Meal', code: 'SBM', category: 'meal' },
];

export const REGIONS = [
  'Black Sea',
  'Russia',
  'Ukraine',
  'Malaysia',
  'Indonesia',
  'Argentina',
  'Brazil',
  'EU',
  'Turkey',
  'India',
  'China',
  'Rotterdam',
];
