const Transaction = require('../models/transaction-model');

class Transactions {
    async getAllTransactions() {
      return await Transaction.find();
    }

    async getAllTransactionsWithinPeriod(startDate, endDate) {
      return await Transaction.find({
        date: { $gte: startDate, $lte: endDate },
      });
    }

    async addTransaction(transaction) {
      return await Transaction.create({
        ...transaction,
      });
    }
}

module.exports = new Transactions();