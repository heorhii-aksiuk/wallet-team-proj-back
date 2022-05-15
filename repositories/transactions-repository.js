const Transaction = require('../models/transaction-model');

class Transactions {
    async getAllTransactions() {
      return await Transaction.find();
    }

    async addTransaction(transaction) {
      return await Transaction.create({
        ...transaction,
      });
    }
}

module.exports = new Transactions();