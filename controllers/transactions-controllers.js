const Transactions = require('../repositories/transactions-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const calculateTotals = require('../helpers/total-calculator');

class TransactionControllers {
  async getTransactions(req, res, next) {
    try {
      const { id } = req.user;
      const { startDate, endDate } = req.query;

      const transactions = await Transactions.getAllTransactionsWithinPeriod(
        id,
        startDate,
        endDate
      );

      const allTransactions = await Transactions.getAllTransactions(id);

      const totals = calculateTotals(allTransactions);

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.CREATED,
        data: { transactions, totals },
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const transactionId = req.params.transactionId;

      const [transaction] = await Transactions.getTransactionById(
        ownerId,
        transactionId
      );

      if (!transaction) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND
        });
      }

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { transaction }
      });
    } catch (error) {
      next(error);
    }
  }

  async addTransaction(req, res, next) {
    try {
      const transaction = req.body;
      const { id } = req.user;

      const addedTransaction = await Transactions.addTransaction(
        id,
        transaction
      );

      return res.status(HttpCodes.CREATED).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.CREATED,
        data: addedTransaction
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTransactionById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const transactionId = req.params.transactionId;
      const updates = req.body;

      const updatedTransaction = await Transactions.updateTransaction(
        ownerId,
        transactionId,
        updates
      );

      if (!updatedTransaction) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND
        });
      }

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { transaction: updatedTransaction }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTransactionById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const transactionId = req.params.transactionId;

      const deletedTransaction = await Transactions.removeTransaction(
        ownerId,
        transactionId
      );

      if (!deletedTransaction) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND
        });
      }

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionControllers();