const { Router } = require('express');
const {
    validateCreatedTransaction,
  } = require('../validation/transactions-validation');
const Controllers = require('../controllers/transactions-controllers');

const transactionsRoutes = Router();

transactionsRoutes.get('/transactions', Controllers.getAllTransactions);
transactionsRoutes.post(
    '/transactions',
    validateCreatedTransaction,
    Controllers.addTransaction,
);

module.exports = transactionsRoutes;