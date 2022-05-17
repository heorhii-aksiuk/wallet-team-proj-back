const { Router } = require('express');
const Controllers = require('../controllers/categories-controllers');

const categoriesRoutes = Router();

categoriesRoutes.get('/categories', Controllers.getAllCategories);

module.exports = categoriesRoutes;