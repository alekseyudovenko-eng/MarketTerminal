// API Route: /api/ai-analysis
// Generate AI market analysis using Gemini or Groq

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY;
  
  if (!GEMINI_API_KEY && !GROQ_API_KEY) {
    return res.status(500).json({ error: 'No AI API keys configured' });
  }

  try {
    const { prices, news, prompt } = req.body;

    // Build comprehensive prompt
    const systemPrompt = buildAnalysisPrompt(prices, news);

    let analysis;
    
    // Try Gemini first, fallback to Groq
    if (GEMINI_API_KEY) {
      analysis = await generateWithGemini(systemPrompt);
    } else {
      analysis = await generateWithGroq(systemPrompt, GROQ_API_KEY);
    }

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      analysis,
      model: GEMINI_API_KEY ? 'gemini-2.0-flash' : 'llama-3.3-70b'
    });

  } catch (error) {
    console.error('AI Analysis API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate analysis',
      message: error.message 
    });
  }
}

function buildAnalysisPrompt(prices, news) {
  return `You are an expert analyst in the vegetable oils and fats market. Analyze the following data and provide a comprehensive market report.

CURRENT MARKET DATA:
${JSON.stringify(prices, null, 2)}

RECENT NEWS:
${JSON.stringify(news, null, 2)}

Please provide a structured analysis in the following format:

## EXECUTIVE SUMMARY
2-3 sentences summarizing the key market movements and trends.

## PRICE ANALYSIS
- Sunflower Oil: Current levels, trends, key drivers
- Palm Oil: Current levels, trends, key drivers  
- Soybean Oil: Current levels, trends, key drivers
- Key spreads and arbitrage opportunities

## MARKET DRIVERS
- Supply factors (production, weather, crops)
- Demand factors (imports, consumption)
- Policy changes (duties, regulations)
- Currency and macro factors

## TRADE FLOWS
- Export trends by region
- Import demand patterns
- Logistics and shipping updates

## OUTLOOK & RISKS
- Short-term outlook (1-2 weeks)
- Key risks to monitor
- Trading recommendations

Format with clear headers and bullet points. Be specific with numbers and data-driven insights.`;
}

async function generateWithGemini(prompt) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 4000,
        topP: 0.8,
        topK: 40
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis generated';
}

async function generateWithGroq(prompt, apiKey) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert vegetable oils market analyst.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Groq API error: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No analysis generated';
}
