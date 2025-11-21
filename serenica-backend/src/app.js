const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const authRoutes = require('./Routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '2mb'}));


app.get('/', (req, res) => res.send({ok: true, service: 'Serenica Backend'}));


app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);


app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
});


module.exports = app;