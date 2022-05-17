const { Router } = require('express');
const guard = require('../middlewares/guard');
const {
    validateStatisticsQuery
} = require('../validation/statistics-validation');
const Controllers = require('../controllers/statistics-controllers');

const statisticsRoutes = Router();

statisticsRoutes.get(
    '/statistics',
    guard,
    validateStatisticsQuery,
    Controllers.getStatistics
);

module.exports = statisticsRoutes;