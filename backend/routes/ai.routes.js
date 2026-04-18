const express = require('express');
const router = express.Router();
const { analyzeSituation, generateEscapePlan, generateExcuse } = require('../controllers/ai.controller');

// Route to analyze a text/voice situation
router.post('/analyze', analyzeSituation);

// Route to get a specific escape plan based on situation
router.post('/escape', generateEscapePlan);

// Route to get a generated excuse
router.post('/excuse', generateExcuse);

module.exports = router;
