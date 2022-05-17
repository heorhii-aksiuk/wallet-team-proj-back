const { Router } = require('express');
const guard = require('../middlewares/guard');
const {
    validateCreatedTransaction
  } = require('../validation/transactions-validation');
const Controllers = require('../controllers/transactions-controllers');

const transactionsRoutes = Router();

transactionsRoutes.get('/transactions', guard, Controllers.getAllTransactions);
transactionsRoutes.post(
    '/transactions',
    guard,
    validateCreatedTransaction,
    Controllers.addTransaction,
);

module.exports = transactionsRoutes;