const Transactions = require('../repositories/transactions-repository');
const HttpCodes = require('../helpers/http-codes');
const Statuses = require('../helpers/statuses');
const calculateTotals = require('../helpers/total-calculator');
const calculateStatistics = require('../helpers/statistics-calculator');

class StatisticsControllers {
  async getStatistics(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      const allTransactionsWithinPeriod =
        await Transactions.getAllTransactionsWithinPeriod(startDate, endDate);

      const statistics = calculateStatistics(allTransactionsWithinPeriod);
      const totals = calculateTotals(allTransactionsWithinPeriod);

      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { statistics, totals },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StatisticsControllers();