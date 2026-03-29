import type { 
  PriceQuote, 
  Spread, 
  Duty, 
  LogisticsItem, 
  MarketNews, 
  TradeFlow, 
  ProductionData,
  AIReport 
} from '@/types/market';

// Current market data snapshot (based on latest research)
export const currentPrices: PriceQuote[] = [
  // Sunflower Oil
  { id: '1', commodity: 'Sunflower Oil', origin: 'Russia (Black Sea)', price: 1228.25, currency: 'USD', unit: 'mt', basis: 'FOB', change: 11.00, changePercent: 0.90, date: '2026-03-27', forward: 'Mar' },
  { id: '2', commodity: 'Sunflower Oil', origin: 'Ukraine', price: 1084.00, currency: 'USD', unit: 'mt', basis: 'FOB', change: -0.75, changePercent: -0.07, date: '2026-03-26', forward: 'Mar' },
  { id: '3', commodity: 'Sunflower Oil', origin: 'Bulgaria', price: 1262.75, currency: 'USD', unit: 'mt', basis: 'FOB', change: -25.50, changePercent: -1.98, date: '2026-03-21', forward: 'Mar' },
  { id: '4', commodity: 'Sunflower Oil', origin: 'Argentina', price: 1207.00, currency: 'USD', unit: 'mt', basis: 'FOB', change: 0.00, changePercent: 0.00, date: '2026-03-26', forward: 'Mar' },
  { id: '5', commodity: 'Sunflower Oil', origin: 'Rotterdam', price: 1365.00, currency: 'USD', unit: 'mt', basis: 'FOB', change: 0.00, changePercent: 0.00, date: '2026-03-26', forward: 'Mar' },
  
  // Palm Oil
  { id: '6', commodity: 'Palm Oil (CPO)', origin: 'Malaysia', price: 982.25, currency: 'USD', unit: 'mt', basis: 'FOB', change: -5.00, changePercent: -0.51, date: '2026-03-26', forward: 'Mar' },
  { id: '7', commodity: 'RBD Palm Olein', origin: 'Malaysia', price: 1023.50, currency: 'USD', unit: 'mt', basis: 'FOB', change: 17.25, changePercent: 1.71, date: '2026-03-26', forward: 'Mar' },
  { id: '8', commodity: 'RBD Palm Stearin', origin: 'Malaysia', price: 999.50, currency: 'USD', unit: 'mt', basis: 'FOB', change: 15.75, changePercent: 1.60, date: '2026-03-26', forward: 'Mar' },
  
  // Soybean Oil
  { id: '9', commodity: 'Soybean Oil', origin: 'Brazil (Paranagua)', price: 1113.25, currency: 'USD', unit: 'mt', basis: 'FOB', change: 20.00, changePercent: 1.83, date: '2026-03-26', forward: 'Mar' },
  { id: '10', commodity: 'Soybean Oil', origin: 'Argentina', price: 1102.50, currency: 'USD', unit: 'mt', basis: 'FOB', change: 25.00, changePercent: 2.32, date: '2026-03-26', forward: 'Mar' },
  { id: '11', commodity: 'Soybean Oil', origin: 'USA (Gulf)', price: 1121.49, currency: 'USD', unit: 'mt', basis: 'FOB', change: 12.57, changePercent: 1.13, date: '2026-03-26', forward: 'Mar' },
  
  // Rapeseed Oil
  { id: '12', commodity: 'Rapeseed Oil', origin: 'Rotterdam', price: 1294.50, currency: 'USD', unit: 'mt', basis: 'FOB', change: 27.75, changePercent: 2.19, date: '2026-03-26', forward: 'Mar' },
  
  // China Market
  { id: '13', commodity: 'RBD Palm Olein', origin: 'China (Dalian)', price: 1175.23, currency: 'USD', unit: 'mt', basis: 'FOB', change: -6.06, changePercent: -0.51, date: '2026-03-26', forward: 'Mar' },
  { id: '14', commodity: 'Soybean Oil', origin: 'China (Dalian)', price: 1158.84, currency: 'USD', unit: 'mt', basis: 'FOB', change: -5.79, changePercent: -0.50, date: '2026-03-26', forward: 'Mar' },
  
  // EXW Prices
  { id: '15', commodity: 'Sunflower Oil', origin: 'Ukraine (EXW)', price: 1245.00, currency: 'USD', unit: 'mt', basis: 'EXW', change: 0.00, changePercent: 0.00, date: '2026-03-26', forward: 'Mar' },
  { id: '16', commodity: 'Sunflower Oil', origin: 'Bulgaria (EXW)', price: 1238.55, currency: 'USD', unit: 'mt', basis: 'EXW', change: -28.63, changePercent: -2.26, date: '2026-03-21', forward: 'Mar' },
];

// Spreads data
export const spreads: Spread[] = [
  { id: '1', name: 'Sunflower vs Palm Oil', commodity1: 'Sunflower Oil (Black Sea)', commodity2: 'Palm Oil (CPO)', spreadValue: 246.00, change: 16.00, date: '2026-03-27' },
  { id: '2', name: 'Sunflower vs Soybean Oil', commodity1: 'Sunflower Oil (Black Sea)', commodity2: 'Soybean Oil (Argentina)', spreadValue: 125.75, change: -14.00, date: '2026-03-27' },
  { id: '3', name: 'RBD Palm Olein vs CPO', commodity1: 'RBD Palm Olein', commodity2: 'Palm Oil (CPO)', spreadValue: 41.25, change: 22.25, date: '2026-03-26' },
  { id: '4', name: 'Sunflower Ukraine vs Russia', commodity1: 'Sunflower Oil (Ukraine)', commodity2: 'Sunflower Oil (Russia)', spreadValue: -144.25, change: -11.75, date: '2026-03-27' },
  { id: '5', name: 'Soybean Oil vs Palm Oil', commodity1: 'Soybean Oil (Brazil)', commodity2: 'Palm Oil (CPO)', spreadValue: 131.00, change: 25.00, date: '2026-03-26' },
];

// Export Duties
export const duties: Duty[] = [
  { 
    id: '1', 
    country: 'Russia', 
    product: 'Sunflower Oil', 
    dutyAmount: 9687, 
    currency: 'RUB', 
    unit: 'mt', 
    effectiveDate: '2026-03-01',
    previousAmount: 9495,
    changePercent: 2.02,
    basePrice: 82500,
    indicativePrice: 1258,
    notes: 'Floating duty: 70% of (base - indicative price)'
  },
  { 
    id: '2', 
    country: 'Russia', 
    product: 'Sunflower Oil', 
    dutyAmount: 16222.4, 
    currency: 'RUB', 
    unit: 'mt', 
    effectiveDate: '2026-04-01',
    previousAmount: 9687,
    changePercent: 67.46,
    basePrice: 82500,
    indicativePrice: 1270.9,
    notes: 'Floating duty: 70% of (base - indicative price). Sharp increase expected'
  },
  { 
    id: '3', 
    country: 'Russia', 
    product: 'Sunflower Meal', 
    dutyAmount: 0, 
    currency: 'RUB', 
    unit: 'mt', 
    effectiveDate: '2026-03-01',
    previousAmount: 0,
    changePercent: 0,
    basePrice: 15875,
    indicativePrice: 199.7,
    notes: 'Zero duty for 3rd consecutive month'
  },
  { 
    id: '4', 
    country: 'Russia', 
    product: 'Sunflower Meal', 
    dutyAmount: 749.6, 
    currency: 'RUB', 
    unit: 'mt', 
    effectiveDate: '2026-04-01',
    previousAmount: 0,
    changePercent: null,
    basePrice: 15875,
    indicativePrice: 203.8,
    notes: 'Duty returns after 3 months at zero'
  },
];

// Logistics updates
export const logistics: LogisticsItem[] = [
  { id: '1', type: 'port', location: 'Novorossiysk', status: 'normal', description: 'Normal operations. Loading rate: 8,000 mt/day', impact: 'low', updatedAt: '2026-03-27' },
  { id: '2', type: 'port', location: 'Odessa', status: 'congested', description: 'Increased vessel queue. Waiting time: 5-7 days', impact: 'medium', updatedAt: '2026-03-26' },
  { id: '3', type: 'border', location: 'Russia-Kazakhstan', status: 'normal', description: 'Truck flow stable. No delays reported', impact: 'low', updatedAt: '2026-03-27' },
  { id: '4', type: 'route', location: 'Black Sea corridor', status: 'normal', description: 'Shipping operations normal. Insurance rates stable', impact: 'low', updatedAt: '2026-03-27' },
  { id: '5', type: 'port', location: 'Constanta', status: 'delayed', description: 'Railway unloading delays. Alternative routing advised', impact: 'medium', updatedAt: '2026-03-25' },
];

// Trade flows
export const tradeFlows: TradeFlow[] = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  { id: '1', exporter: 'Ukraine', importer: 'Global', product: 'Sunflower Oil', volume: 2.98, unit: 'mmt', period: 'MY 2024/25 (till Feb)', changeYoY: -24.6 },
  { id: '2', exporter: 'Russia', importer: 'Global', product: 'Sunflower Oil', volume: 5.1, unit: 'mmt', period: 'MY 2024/25', changeYoY: null },
  { id: '3', exporter: 'Ukraine', importer: 'Global', product: 'Sunflower Oil', volume: 5.7, unit: 'mmt', period: 'MY 2024/25 (est)', changeYoY: null },
  { id: '4', exporter: 'USA', importer: 'Global', product: 'Soybean Oil', volume: 1.1, unit: 'mmt', period: 'MY 2024/25', changeYoY: 304 },
  { id: '5', exporter: 'Brazil', importer: 'Global', product: 'Soybean Oil', volume: 1.5, unit: 'mmt', period: 'MY 2024/25 (est)', changeYoY: null },
  { id: '6', exporter: 'Malaysia', importer: 'Global', product: 'Palm Oil', volume: 16.5, unit: 'mmt', period: '2025', changeYoY: null },
  { id: '7', exporter: 'Indonesia', importer: 'Global', product: 'Palm Oil', volume: 28.0, unit: 'mmt', period: '2025 (est)', changeYoY: null },
];

// Production data
export const productionData: ProductionData[] = [
  { id: '1', country: 'Russia', product: 'Sunflower Oil', volume: 6.7, unit: 'mmt', season: 'MY 2024/25', forecast: null, changeYoY: null },
  { id: '2', country: 'Ukraine', product: 'Sunflower Oil', volume: 5.61, unit: 'mmt', season: 'MY 2024/25', forecast: null, changeYoY: null },
  { id: '3', country: 'Ukraine', product: 'Sunflower Seed', volume: 13.5, unit: 'mmt', season: '2025/26 (est)', forecast: 13.7, changeYoY: null },
  { id: '4', country: 'EU', product: 'Sunflower Seed', volume: 8.9, unit: 'mmt', season: '2024/25', forecast: null, changeYoY: -9.2 },
  { id: '5', country: 'Malaysia', product: 'Palm Oil', volume: 19.5, unit: 'mmt', season: '2025', forecast: null, changeYoY: null },
];

// Market news
export const marketNews: MarketNews[] = [
  { 
    id: '1', 
    title: 'Russia increases sunflower oil export duty by 2% in March', 
    summary: 'Duty rises to 9,687 RUB/t from 9,495 RUB/t. Indicative price: $1,258/t. Meal duty remains at zero.', 
    source: 'Interfax', 
    category: 'policy', 
    region: 'Russia',
    publishedAt: '2026-03-02' 
  },
  { 
    id: '2', 
    title: 'Russia to sharply increase sunflower oil export duty in April', 
    summary: 'April duty projected at 16,222 RUB/t (67% increase). Indicative price rises to $1,270.9/t. Meal duty returns at 749.6 RUB/t.', 
    source: 'APK-Inform', 
    category: 'policy', 
    region: 'Russia',
    publishedAt: '2026-03-27' 
  },
  { 
    id: '3', 
    title: 'Ukraine sunflower oil exports down 24.6% YoY', 
    summary: 'Ukraine exported 2.98 mmt in MY 2024/25 till Feb vs 3.95 mmt same period last year. Full season export estimated at 5.7 mmt.', 
    source: 'S&P Global', 
    category: 'trade', 
    region: 'Ukraine',
    publishedAt: '2026-03-19' 
  },
  { 
    id: '4', 
    title: 'Black Sea sunflower oil prices face seasonal pressure', 
    summary: 'Good weather in Russia and Ukraine supports crop development. Harvest forecasts raised. Increased competition expected.', 
    source: 'Tridge', 
    category: 'production', 
    region: 'Black Sea',
    publishedAt: '2026-03-20' 
  },
  { 
    id: '5', 
    title: 'US soybean oil exports surge 304% YoY', 
    summary: 'USA exported 1.1 mmt of soybean oil in MY 2024/25. Total soy complex exports reached 68.7 mmt (+12.8% YoY).', 
    source: 'USSEC', 
    category: 'trade', 
    region: 'USA',
    publishedAt: '2026-01-20' 
  },
  { 
    id: '6', 
    title: 'Malaysia CPO prices rise to 4,516 MYR/t', 
    summary: 'Crude palm oil prices strengthen on increased demand from importers. RBD Palm Olein premium widens to $41.25/t over CPO.', 
    source: 'MPOB', 
    category: 'prices', 
    region: 'Malaysia',
    publishedAt: '2026-03-26' 
  },
  { 
    id: '7', 
    title: 'Russia extends sunflower export duties until August 2028', 
    summary: 'Floating duty mechanism extended for two more seasons. Base price: 82,500 RUB/t for oil, 15,875 RUB/t for meal.', 
    source: 'Government Decree', 
    category: 'policy', 
    region: 'Russia',
    publishedAt: '2025-10-24' 
  },
  { 
    id: '8', 
    title: 'EU sunflower crop forecast cut to 8.9 mmt', 
    summary: 'Strategie Grains reduced EU sunseed crop forecast by 0.4 mmt. Would be 10% below last year\'s 9.8 mmt. Lowest yield in 15 years.', 
    source: 'Strategie Grains', 
    category: 'production', 
    region: 'EU',
    publishedAt: '2026-03-15' 
  },
];

// Generate comprehensive AI report
export function generateAIReport(): AIReport {
  const now = new Date().toISOString();
  
  return {
    id: '1',
    title: 'Vegetable Oils Market: Weekly Intelligence Report',
    summary: 'Sunflower oil market faces divergent trends: Russian export duties set to spike 67% in April, tightening supply outlook. Ukraine exports lag 24% YoY. Palm oil strengthens on Malaysian demand. Soybean oil gains on record US exports.',
    keyPoints: [
      'Russia sunflower oil export duty to jump to 16,222 RUB/t in April (+67% MoM)',
      'Ukraine sunflower oil exports at 2.98 mmt (-24.6% YoY) through February',
      'Black Sea FOB spread: Russia $1,228/t vs Ukraine $1,084/t ($144 premium)',
      'Malaysia CPO at $982/t; RBD Palm Olein premium expands to $41/t',
      'US soybean oil exports surge 304% YoY to 1.1 mmt',
      'EU sunflower crop cut to 8.9 mmt (-10% YoY) - lowest in 15 years',
      'Odessa port congestion: vessel wait times 5-7 days',
    ],
    content: `
## EXECUTIVE SUMMARY

The vegetable oils market is experiencing significant policy-driven volatility, particularly in the Black Sea region where Russian export duty mechanics are creating supply uncertainty. Current market structure shows sunflower oil trading at premium to palm oil ($246/t spread), supporting crush margins despite weakening export flows from Ukraine.

## PRICE ANALYSIS

### Sunflower Oil Complex
- **Russia FOB Black Sea**: $1,228.25/t (+$11.00, +0.90%)
  - Forward curve remains in contango through Q2
  - April duty increase to pressure export availability
  
- **Ukraine FOB**: $1,084.00/t (-$0.75, -0.07%)
  - Farmer selling remains restrained
  - Domestic EXW at $1,245/t indicates strong internal demand
  
- **Regional Spreads**: 
  - Russia-Ukraine FOB differential: $144.25/t
  - Bulgaria FOB: $1,262.75/t (premium market)
  - Rotterdam: $1,365.00/t (EU benchmark)

### Palm Oil Complex
- **Malaysia CPO**: $982.25/t (-$5.00, -0.51%)
- **RBD Palm Olein**: $1,023.50/t (+$17.25, +1.71%)
- **Processing Margin**: $41.25/t (expanded $22.25)

Bursa Malaysia futures (FCPO) at 4,631 MYR/t reflect demand recovery from key importers India and China.

### Soybean Oil
- **Argentina FOB**: $1,102.50/t (+$25.00, +2.32%)
- **Brazil FOB**: $1,113.25/t (+$20.00, +1.83%)
- **US Gulf FOB**: $1,121.49/t (+$12.57, +1.13%)

US exports at record 1.1 mmt (+304% YoY) driven by competitive pricing vs palm oil.

## POLICY & REGULATORY

### Russian Export Duty Mechanism
The floating duty formula (70% of base-indicative spread) creates procyclical pressure:

| Month | Duty (RUB/t) | Indicative Price ($/t) | MoM Change |
|-------|-------------|----------------------|------------|
| Feb 2026 | 9,495 | 1,233.3 | +2.1% |
| Mar 2026 | 9,687 | 1,258.0 | +2.0% |
| Apr 2026 | 16,222 | 1,270.9 | +67.5% |

**Implications**: 
- April duty spike will likely trigger advance March loading
- Export window compression favors Russian crushers with storage
- Ukraine competitive position improves relatively

### Duty Extension Through 2028
Government decree extends mechanism to August 31, 2028, providing policy certainty but maintaining structural export constraints.

## TRADE FLOWS

### Sunflower Oil Exports (MY 2024/25)
| Origin | Volume (mmt) | YoY Change | Status |
|--------|-------------|------------|--------|
| Ukraine | 2.98* | -24.6% | Through Feb |
| Ukraine (est) | 5.70 | - | Full season |
| Russia | 5.10 | - | Full season |
| Russia (est) | 5.20-5.30 | +2-4% | New season |

*Ukraine exports constrained by production shortfall and logistics bottlenecks

### US Soy Complex Exports (MY 2024/25)
- Total: 68.7 mmt (+12.8% YoY)
- Whole beans: 51.2 mmt (+10.7%)
- Meal: 16.3 mmt (+13.9%, record)
- Oil: 1.1 mmt (+304%)

## PRODUCTION OUTLOOK

### Northern Hemisphere Sunflower
- **Russia**: Record 11.2 mln ha planted area; production est. 6.7 mmt oil
- **Ukraine**: Harvest delayed to early September; yield concerns persist
- **EU**: 8.9 mmt crop (-10% YoY) - drought impact in Bulgaria (1.55 t/ha), Romania (1.45 t/ha)

### Palm Oil
- **Malaysia**: 2025 production estimated at 19.5 mmt
- **Indonesia**: 28.0 mmt estimated exports (2025)

## LOGISTICS & INFRASTRUCTURE

| Location | Status | Impact | Update |
|----------|--------|--------|--------|
| Novorossiysk | Normal | Low | Mar 27 |
| Odessa | Congested | Medium | Mar 26 |
| Constanta | Delayed | Medium | Mar 25 |
| Black Sea Corridor | Normal | Low | Mar 27 |

Odessa vessel queue at 5-7 days is creating loading delays for Ukrainian exporters.

## MARKET OUTLOOK

### Near-term (1-3 months)
- Russian April duty spike to accelerate March loadings
- Ukraine new crop arrival (September) to ease supply tightness
- Palm oil demand recovery from India/China to support prices

### Key Risks
1. **Policy**: Further Russian duty adjustments
2. **Weather**: Northern Hemisphere crop development
3. **Logistics**: Black Sea shipping disruptions
4. **Currency**: RUB/USD volatility affecting duty calculations

### Trading Recommendations
- Monitor Russia-Ukraine FOB spread for arbitrage opportunities
- Watch RBD Palm Olein-CPO processing margin expansion
- Track US soybean oil export pace for demand signals

---
Report generated: ${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })} UTC
Data sources: APK-Inform, Interfax, S&P Global Platts, USDA, MPOB, Tridge
`,
    generatedAt: now,
    category: 'comprehensive'
  };
}

// Helper functions
export function getPricesByCommodity(commodity: string): PriceQuote[] {
  return currentPrices.filter(p => p.commodity.toLowerCase().includes(commodity.toLowerCase()));
}

export function getPricesByOrigin(origin: string): PriceQuote[] {
  return currentPrices.filter(p => p.origin.toLowerCase().includes(origin.toLowerCase()));
}

export function getNewsByCategory(category: string): MarketNews[] {
  return marketNews.filter(n => n.category === category);
}

export function getLatestNews(limit: number = 5): MarketNews[] {
  return marketNews
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
