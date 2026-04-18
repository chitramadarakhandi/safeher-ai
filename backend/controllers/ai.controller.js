const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper to structure output
const STRUCTURED_PROMPT = `
You are SafeHer AI, an intelligent, calm, and supportive proactive women's safety assistant.
Analyze the user's situation and provide guidance formatted strictly as JSON with this schema:
{
  "riskLevel": "LOW | MEDIUM | HIGH",
  "reason": "Brief explanation of why this risk level was assigned.",
  "immediateActions": ["Action 1", "Action 2", "Action 3"],
  "escapePlan": ["Step 1", "Step 2", "Step 3"],
  "reassurance": "A calm, supportive response to reassure the user."
}
IMPORTANT: Output ONLY valid JSON, without markdown blocks, without code blocks, just raw JSON text. 'escapePlan' MUST be an array of strings providing step-by-step clear instructions, NOT a single paragraph.
`;

exports.analyzeSituation = async (req, res) => {
  try {
    const { situation, context } = req.body;
    
    if (!situation) {
      return res.status(400).json({ error: 'Situation description is required.' });
    }

    if (!ai) {
      // Offline/Mock fallback if no API key provided
      return res.json({
        mock: true,
        riskLevel: 'MEDIUM',
        reason: 'API Key not configured. Treating as default medium risk.',
        immediateActions: ['Stay alert', 'Move to a crowded area', 'Keep your phone accessible'],
        escapePlan: [
          'Identify your nearest exit or well-lit storefront immediately.',
          'Walk briskly towards populated areas without isolating yourself.',
          'Consider informing a trusted contact of your current location.'
        ],
        reassurance: 'Stay calm. SafeHer is monitoring your status.'
      });
    }

    const fullPrompt = `${STRUCTURED_PROMPT}\n\nContext: ${context || 'None provided'}\nUser Situation: ${situation}`;
    
    let rawText;
    if (ai) {
      const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const response = await model.generateContent(fullPrompt);
      rawText = response.response.text();
    } else {
      // Logic handled by the mock above, shouldn't reach here unless mock block is bypassed.
    }
    // Clean markdown if present
    if (rawText.startsWith('\`\`\`json')) {
      rawText = rawText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    } else if (rawText.startsWith('\`\`\`')) {
      rawText = rawText.replace(/\`\`\`/g, '').trim();
    }

    const resultData = JSON.parse(rawText);
    res.json(resultData);

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to analyze situation.' });
  }
};

exports.generateEscapePlan = async (req, res) => {
  try {
    const { situation } = req.body;
    
    if (!ai) {
      return res.json({ plan: "Mock Plan: Quickly identify exits, inform a trusted contact, and move towards a populated area safely." });
    }

    const prompt = `You are a safety expert. Give a quick, realistic 3-step escape plan for the following scenario: ${situation}. Keep it actionable and brief. Do not use markdown JSON, just plain text.`;
    
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const response = await model.generateContent(prompt);

    res.json({ plan: response.response.text() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate escape plan.' });
  }
};

exports.generateExcuse = async (req, res) => {
  try {
    const { context } = req.body;
    
    if (!ai) {
      return res.json({ excuse: "I'm sorry, I just got an emergency call from my roommate, I have to step out immediately." });
    }

    const prompt = `You are a safety assistant. Provide a single, realistic, and natural-sounding conversational excuse for a woman to quickly leave an uncomfortable situation. Context: ${context}. Keep it under 2 sentences. Don't use quotes.`;
    
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const response = await model.generateContent(prompt);

    res.json({ excuse: response.response.text() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate excuse.' });
  }
};
