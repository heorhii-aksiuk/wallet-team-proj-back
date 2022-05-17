const calculateStatistics = transactions => {
    const result = transactions.reduce((statistics, transaction) => {
        const category = transaction.category;
        const categoryCount = statistics[category]
            ? {
                ...statistics[category],
    
                sum: statistics[category].sum + transaction.sum,
            }
            : {
            category: transaction.category,
            income: transaction.income,
            sum: transaction.sum,
            };
  
        return { ...statistics, [category]: categoryCount };
    }, {});
  
    return Object.values(result);
};
  
module.exports = calculateStatistics;