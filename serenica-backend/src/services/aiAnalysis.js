// Minimal AI analysis service using OpenAI for sentiment and suggestions.


const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);


const analyzeText = async ({ text, userId }) => {
if (!text) return { sentimentScore: 0, riskScore: 0, transcript: '', metadata: {} };


// 1) simple sentiment prompt
try {
const prompt = `Analyze the following journal entry and return a JSON object with keys: sentiment (-1 to 1), risk (0-100), brief_suggestion.\n\nJournal: """${text}"""`;


const response = await openai.createCompletion({
model: 'text-davinci-003',
prompt,
max_tokens: 200,
temperature: 0.2,
});


const raw = response.data.choices[0].text.trim();
// Attempt to parse JSON from raw text
let parsed = {};
try { parsed = JSON.parse(raw); } catch (e) {
// fallback naive parsing
parsed = { sentiment: 0, risk: 0, brief_suggestion: raw };
}


const sentimentScore = parsed.sentiment || 0;
const riskScore = parsed.risk || 0;


return { sentimentScore, riskScore, transcript: text, metadata: { suggestion: parsed.brief_suggestion } };
} catch (err) {
console.error('AI analysis failed', err?.message || err);
return { sentimentScore: 0, riskScore: 0, transcript: text, metadata: {} };
}
};


module.exports = { analyzeText };