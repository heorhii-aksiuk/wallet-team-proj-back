const calculateTotals = transactions => {
    return transactions.reduce(
      (totals, transaction) => {
        totals = transaction.income
          ? { ...totals, income: totals.income + transaction.sum }
          : { ...totals, expense: totals.expense + transaction.sum };
  
        return { ...totals, balance: totals.income - totals.expense };
      },
      {
        income: 0,
        expense: 0,
        balance: 0,
      },
    );
};
  
module.exports = calculateTotals;