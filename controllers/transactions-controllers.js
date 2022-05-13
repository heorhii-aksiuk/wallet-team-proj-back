const getAllTransactions = (req, res, next) => {
    try {
      res.json({ message: 'All transactions' });
    } catch (error) {
      next(error);
    }
};
  
const addTransaction = (req, res, next) => {
    try {
      res.json({ message: 'Add new transactions' });
    } catch (error) {
      next(error);
    }
};
  
module.exports = { getAllTransactions, addTransaction };