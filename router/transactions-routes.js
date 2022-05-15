const { Router } = require('express');
const Controllers = require('../controllers/transactions-controllers');

const transactionsRoutes = Router();

transactionsRoutes.get('/transactions', Controllers.getAllTransactions);
transactionsRoutes.post('/transactions', Controllers.addTransaction);

module.exports = transactionsRoutes;