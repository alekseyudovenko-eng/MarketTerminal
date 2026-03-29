// API Route: /api/news
// Search for vegetable oils market news using Tavily API

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
  
  if (!TAVILY_API_KEY) {
    return res.status(500).json({ error: 'TAVILY_API_KEY not configured' });
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: 'vegetable oils market news sunflower palm soybean oil prices today',
        search_depth: 'advanced',
        include_answer: true,
        max_results: 10,
        days: 3 // Last 3 days
      })
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`);
    }

    const data = await response.json();

    // Format news items
    const newsItems = (data.results || []).map((result, index) => ({
      id: `news-${index}`,
      title: result.title,
      summary: result.content?.substring(0, 300) + '...' || result.snippet,
      url: result.url,
      source: new URL(result.url).hostname.replace('www.', ''),
      publishedAt: new Date().toISOString(), // Tavily doesn't always provide date
      category: categorizeNews(result.title + ' ' + result.content)
    }));

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      answer: data.answer,
      news: newsItems
    });

  } catch (error) {
    console.error('News API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message 
    });
  }
}

function categorizeNews(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('$')) {
    return 'prices';
  }
  if (lowerText.includes('export') || lowerText.includes('import') || lowerText.includes('trade')) {
    return 'trade';
  }
  if (lowerText.includes('duty') || lowerText.includes('tax') || lowerText.includes('policy') || lowerText.includes('government')) {
    return 'policy';
  }
  if (lowerText.includes('port') || lowerText.includes('shipping') || lowerText.includes('logistics')) {
    return 'logistics';
  }
  if (lowerText.includes('crop') || lowerText.includes('harvest') || lowerText.includes('production')) {
    return 'production';
  }
  
  return 'general';
}
