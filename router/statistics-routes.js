const { Router } = require('express');
const Controllers = require('../controllers/statistics-controllers');

const statisticsRoutes = Router();

statisticsRoutes.get('/statistics', Controllers.getStatistics);

module.exports = statisticsRoutes;