const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

/**
 * Portfolio Routes (Public)
 */
router.get('/:portfolioId', portfolioController.getPortfolio);

module.exports = router;
