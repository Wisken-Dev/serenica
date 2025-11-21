const mongoose = require('mongoose');


const JournalSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
text: { type: String },
mediaUrl: { type: String },
transcript: { type: String },
sentimentScore: { type: Number, default: 0 },
riskScore: { type: Number, default: 0 },
metadata: { type: Object },
}, { timestamps: true });


module.exports = mongoose.model('Journal', JournalSchema);