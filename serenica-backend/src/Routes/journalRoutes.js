const express = require('express');
const auth = require('../middleware/auth');
const { createJournal, listJournals, getJournal } = require('../controllers/journalController');
const router = express.Router();


router.post('/', auth, createJournal);
router.get('/', auth, listJournals);
router.get('/:id', auth, getJournal);


module.exports = router;