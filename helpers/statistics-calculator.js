const Categories = require('./categories');

const calculateStatistics = transactions => {
    const expenceTransactions = transactions.filter(
        (transaction) => transaction.income === false
    );

    const result = expenceTransactions.reduce((statistics, transaction) => {
        const category = transaction.category;
        const categoryCount = statistics[category]
            ? {
                ...statistics[category],
    
                sum: statistics[category].sum + transaction.sum,
            }
            : {
            category: transaction.category,
            income: transaction.income.false,
            sum: transaction.sum,
            color: Categories.find(element => element.name === category).color,
            };
  
        return { ...statistics, [category]: categoryCount };
    }, {});
  
    return Object.values(result);
};
  
module.exports = calculateStatistics;