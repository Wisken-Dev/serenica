const Journal = require('../models/Journal');
const User = require('../models/User');
const aiAnalysis = require('../services/aiAnalysis');


const createJournal = async (req, res) => {
const userId = req.userId;
const { text, mediaUrl } = req.body;
try {
const entry = await Journal.create({ userId, text, mediaUrl });
// send to AI analysis (async)
const analysis = await aiAnalysis.analyzeText({ text, userId });
entry.sentimentScore = analysis.sentimentScore;
entry.riskScore = analysis.riskScore;
entry.transcript = analysis.transcript || '';
entry.metadata = analysis.metadata || {};
await entry.save();


// If high risk, trigger alert (for MVP we only return flagged status)
if (entry.riskScore >= 70) {
// TODO: trigger notification service (Twilio/Email) when consented
console.log('High risk detected for user', userId);
}


res.json({ entry, analysis });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to create journal' });
}
};


const listJournals = async (req, res) => {
const userId = req.userId;
const entries = await Journal.find({ userId }).sort({ createdAt: -1 }).limit(100);
res.json({ entries });
};


const getJournal = async (req, res) => {
const { id } = req.params;
const entry = await Journal.findById(id);
res.json({ entry });
};


module.exports = { createJournal, listJournals, getJournal };