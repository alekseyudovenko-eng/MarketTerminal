// API Route: /api/prices
// Search for current vegetable oil prices using Serper API

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SERPER_API_KEY = process.env.SERPER_API_KEY;
  
  if (!SERPER_API_KEY) {
    return res.status(500).json({ error: 'SERPER_API_KEY not configured' });
  }

  try {
    // Search queries for different oils
    const queries = [
      'sunflower oil FOB Black Sea price today 2026',
      'palm oil CPO Malaysia price today',
      'soybean oil FOB Argentina price today',
      'rapeseed oil Rotterdam price today'
    ];

    const results = await Promise.all(
      queries.map(async (query) => {
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': SERPER_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            q: query,
            num: 5,
            tbs: 'qdr:d' // Last 24 hours
          })
        });

        if (!response.ok) {
          throw new Error(`Serper API error: ${response.status}`);
        }

        const data = await response.json();
        return {
          query,
          results: data.organic || []
        };
      })
    );

    // Extract price data from search results
    const priceData = extractPricesFromResults(results);

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      data: priceData
    });

  } catch (error) {
    console.error('Prices API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch prices',
      message: error.message 
    });
  }
}

function extractPricesFromResults(results) {
  const prices = [];
  
  const pricePatterns = {
    'Sunflower Oil': /(\$[\d,]+(?:\.\d+)?)\s*(?:per|\/)?\s*(?:mt|ton|metric ton)/i,
    'Palm Oil': /(\$[\d,]+(?:\.\d+)?)\s*(?:per|\/)?\s*(?:mt|ton|metric ton)/i,
    'Soybean Oil': /(\$[\d,]+(?:\.\d+)?)\s*(?:per|\/)?\s*(?:mt|ton|metric ton)/i,
    'Rapeseed Oil': /(\$[\d,]+(?:\.\d+)?)\s*(?:per|\/)?\s*(?:mt|ton|metric ton)/i
  };

  results.forEach(({ query, results }) => {
    const commodity = query.includes('sunflower') ? 'Sunflower Oil' :
                     query.includes('palm') ? 'Palm Oil' :
                     query.includes('soybean') ? 'Soybean Oil' :
                     query.includes('rapeseed') ? 'Rapeseed Oil' : 'Unknown';

    results.forEach(result => {
      const text = `${result.title} ${result.snippet}`;
      const match = text.match(pricePatterns[commodity]);
      
      if (match) {
        prices.push({
          commodity,
          price: match[1],
          source: result.link,
          snippet: result.snippet,
          extractedAt: new Date().toISOString()
        });
      }
    });
  });

  return prices;
}
