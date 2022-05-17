const { Router } = require('express');
const {
    validateStatisticsQuery,
} = require('../validaton/statistics-validation');
const Controllers = require('../controllers/statistics-controllers');

const statisticsRoutes = Router();

statisticsRoutes.get(
    '/statistics',
    validateStatisticsQuery,
    Controllers.getStatistics,
);

module.exports = statisticsRoutes;